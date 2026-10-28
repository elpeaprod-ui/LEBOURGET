import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import {
  collection, doc, onSnapshot, query, where, setDoc, getDoc, updateDoc,
  writeBatch, increment, Unsubscribe
} from 'firebase/firestore';
import {
  Trip, UserProfile, Booking, ChatMessage, Conversation, ReportItem, UserReview
} from '../types';
import { auth, db, isFirebaseConfigured } from '../firebase';

export type PageView =
  | 'accueil'
  | 'recherche'
  | 'detail'
  | 'publier'
  | 'mes-trajets'
  | 'messagerie'
  | 'profil'
  | 'pourquoi'
  | 'signalement'
  | 'mentions';

interface Toast {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export interface SignUpData {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  telephone: string;
}

interface AppContextType {
  // Configuration & authentification
  firebaseReady: boolean;
  authReady: boolean;
  isLoggedIn: boolean;
  signUp: (data: SignUpData) => Promise<string | null>;
  logIn: (email: string, password: string) => Promise<string | null>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<string | null>;
  resendVerification: () => Promise<void>;
  refreshEmailVerified: () => Promise<boolean>;
  requireAuth: () => boolean;

  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedTripId: string | null;
  setSelectedTripId: (id: string | null) => void;

  // Utilisateur actuel
  currentUser: UserProfile;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  userReviews: UserReview[];

  // Trajets
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'creeLe' | 'conducteurId' | 'conducteurNom' | 'conducteurBio' | 'conducteurNote' | 'conducteurAvisCount' | 'conducteurTel'>) => Trip;
  deleteTrip: (id: string) => void;

  // Recherche & Filtres
  searchCity: string;
  setSearchCity: (city: string) => void;
  searchSeats: number;
  setSearchSeats: (seats: number) => void;
  searchDate: string;
  setSearchDate: (date: string) => void;

  // Réservations
  bookings: Booking[];
  createBooking: (tripId: string, places: number, message?: string) => boolean;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: 'confirmee' | 'refusee') => void;

  // Messagerie
  conversations: Conversation[];
  messages: ChatMessage[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
  startOrOpenConversation: (tripId: string, targetUserId: string, targetUserName: string) => string;
  unreadCount: number;

  // Signalements
  reports: ReportItem[];
  submitReport: (report: Omit<ReportItem, 'id' | 'signaleurId' | 'date' | 'statut'>) => void;

  // Notifications Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Modale d'authentification
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const GUEST: UserProfile = {
  id: '',
  prenom: 'Invité',
  nom: '',
  email: '',
  emailVerified: false,
  telephone: '',
  bio: '',
  note: 0,
  avisCount: 0,
  dateInscription: ''
};

// --- Utilitaires ---------------------------------------------------------

/** Normalise un numéro français au format attendu par firestore.rules (06…, ou +336…). */
export const normalizePhoneFR = (raw: string): string | null => {
  let t = raw.replace(/[\s.\-()]/g, '');
  if (t.startsWith('0033')) t = '+33' + t.slice(4);
  return /^(\+33|0)[1-9]\d{8}$/.test(t) ? t : null;
};

const stripUndefined = <T extends Record<string, any>>(obj: T): T =>
  JSON.parse(JSON.stringify(obj)) as T;

const formatTime = (iso?: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const sameDay = d.toDateString() === new Date().toDateString();
  return sameDay
    ? d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
};

const authErrorMessage = (err: any): string => {
  switch (err?.code) {
    case 'auth/email-already-in-use': return "Cette adresse email est déjà utilisée. Connecte-toi plutôt.";
    case 'auth/invalid-email': return "Adresse email invalide.";
    case 'auth/weak-password': return "Mot de passe trop court (6 caractères minimum).";
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found': return "Email ou mot de passe incorrect.";
    case 'auth/too-many-requests': return "Trop de tentatives. Réessaie dans quelques minutes.";
    case 'auth/network-request-failed': return "Problème de connexion réseau.";
    default: return "Une erreur est survenue. Réessaie dans un instant.";
  }
};

const logSnapshotError = (label: string) => (err: unknown) => {
  console.error(`[Firestore] ${label}`, err);
};

// --- Provider ------------------------------------------------------------

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageView>('accueil');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Authentification
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(!isFirebaseConfigured);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);
  const [phone, setPhone] = useState<string>('');

  // Données partagées (Firestore)
  const [rawTrips, setRawTrips] = useState<Trip[]>([]);
  const [tripPhones, setTripPhones] = useState<Record<string, string>>({});
  const [passengerBookings, setPassengerBookings] = useState<Booking[]>([]);
  const [driverBookings, setDriverBookings] = useState<Booking[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messagesByConv, setMessagesByConv] = useState<Record<string, ChatMessage[]>>({});
  const [reports, setReports] = useState<ReportItem[]>([]);
  const userReviews: UserReview[] = [];

  // Recherche & Filtres
  const [searchCity, setSearchCity] = useState<string>('');
  const [searchSeats, setSearchSeats] = useState<number>(1);
  const [searchDate, setSearchDate] = useState<string>('2026-11-07');

  // Messagerie active
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Modale Auth
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const uid = authUser?.uid ?? '';
  const isLoggedIn = Boolean(authUser);

  // --- Toasts ---
  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Session d'authentification ---
  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setAuthUser(u);
      setEmailVerified(Boolean(u?.emailVerified));
      setAuthReady(true);
      if (!u) {
        setProfile(null);
        setPhone('');
        setPassengerBookings([]);
        setDriverBookings([]);
        setConversations([]);
        setMessagesByConv({});
        setTripPhones({});
      }
    });
  }, []);

  // Après clic sur le lien de l'email, mettre à jour le statut au retour sur l'onglet
  useEffect(() => {
    if (!auth || !authUser || emailVerified) return;
    const onFocus = () => { refreshEmailVerified(true); };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, emailVerified]);

  // --- Profil & téléphone privé ---
  useEffect(() => {
    if (!db || !uid) return;
    const unsubProfile = onSnapshot(
      doc(db, 'profils', uid),
      (snap) => setProfile(snap.exists() ? (snap.data() as Partial<UserProfile>) : null),
      logSnapshotError('profil')
    );
    const unsubPhone = onSnapshot(
      doc(db, 'profils', uid, 'prive', 'contact'),
      (snap) => setPhone(snap.exists() ? String(snap.data().telephone ?? '') : ''),
      logSnapshotError('contact')
    );
    return () => { unsubProfile(); unsubPhone(); };
  }, [uid]);

  // --- Trajets (publics) ---
  useEffect(() => {
    if (!db) return;
    return onSnapshot(
      collection(db, 'trajets'),
      (snap) => {
        setRawTrips(snap.docs.map((d) => ({ ...(d.data() as Trip), id: d.id, conducteurTel: '' })));
      },
      logSnapshotError('trajets')
    );
  }, []);

  // --- Réservations (les miennes, en tant que passager ou conducteur) ---
  useEffect(() => {
    if (!db || !uid) return;
    const toBooking = (d: any): Booking => ({ ...(d.data() as Booking), id: d.id });
    const u1 = onSnapshot(
      query(collection(db, 'reservations'), where('passagerId', '==', uid)),
      (snap) => setPassengerBookings(snap.docs.map(toBooking)),
      logSnapshotError('reservations passager')
    );
    const u2 = onSnapshot(
      query(collection(db, 'reservations'), where('conducteurId', '==', uid)),
      (snap) => setDriverBookings(snap.docs.map(toBooking)),
      logSnapshotError('reservations conducteur')
    );
    return () => { u1(); u2(); };
  }, [uid]);

  const bookings = useMemo(() => {
    const map = new Map<string, Booking>();
    [...passengerBookings, ...driverBookings].forEach((b) => map.set(b.id, b));
    return Array.from(map.values()).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }, [passengerBookings, driverBookings]);

  // --- Téléphone du conducteur : lisible uniquement une fois la réservation confirmée ---
  useEffect(() => {
    if (!db || !uid) return;
    const firestore = db;
    passengerBookings
      .filter((b) => b.statut === 'confirmee' && tripPhones[b.trajetId] === undefined)
      .forEach(async (b) => {
        try {
          const snap = await getDoc(doc(firestore, 'trajets', b.trajetId, 'contact', 'phone'));
          setTripPhones((prev) => ({ ...prev, [b.trajetId]: snap.exists() ? String(snap.data().telephone ?? '') : '' }));
        } catch (err) {
          console.error('[Firestore] téléphone conducteur', err);
        }
      });
  }, [passengerBookings, uid, tripPhones]);

  const trips = useMemo(
    () => rawTrips.map((t) => ({
      ...t,
      conducteurTel: t.conducteurId === uid ? phone : (tripPhones[t.id] ?? '')
    })),
    [rawTrips, tripPhones, uid, phone]
  );

  // --- Conversations ---
  useEffect(() => {
    if (!db || !uid) return;
    return onSnapshot(
      query(collection(db, 'conversations'), where('participantIds', 'array-contains', uid)),
      (snap) => {
        const list = snap.docs.map((d) => {
          const data = d.data() as Conversation;
          return { ...data, id: d.id, derniereDate: formatTime(data.derniereDateISO) || data.derniereDate };
        });
        list.sort((a, b) => (b.derniereDateISO || '').localeCompare(a.derniereDateISO || ''));
        setConversations(list);
      },
      logSnapshotError('conversations')
    );
  }, [uid]);

  // --- Messages de chaque conversation ---
  const convIdsKey = conversations.map((c) => c.id).sort().join('|');
  useEffect(() => {
    if (!db || !uid || !convIdsKey) {
      setMessagesByConv({});
      return;
    }
    const firestore = db;
    const unsubs: Unsubscribe[] = convIdsKey.split('|').map((id) =>
      onSnapshot(
        collection(firestore, 'conversations', id, 'messages'),
        (snap) => {
          setMessagesByConv((prev) => ({
            ...prev,
            [id]: snap.docs.map((d) => ({ ...(d.data() as ChatMessage), id: d.id }))
          }));
        },
        logSnapshotError('messages')
      )
    );
    return () => unsubs.forEach((u) => u());
  }, [convIdsKey, uid]);

  const messages = useMemo(() => {
    return Object.values(messagesByConv)
      .flat()
      .sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''))
      .map((m) => ({ ...m, timestamp: formatTime(m.createdAt) || m.timestamp }));
  }, [messagesByConv]);

  const unreadCount = messages.filter((m) => m.expediteurId !== uid && !m.isRead).length;

  // Marquer comme lus les messages de la conversation ouverte
  useEffect(() => {
    if (!db || !uid || currentPage !== 'messagerie' || !activeConversationId) return;
    const toMark = messages.filter(
      (m) => m.conversationId === activeConversationId && m.expediteurId !== uid && !m.isRead
    );
    if (toMark.length === 0) return;
    const batch = writeBatch(db);
    toMark.forEach((m) =>
      batch.update(doc(db!, 'conversations', activeConversationId, 'messages', m.id), { isRead: true })
    );
    batch.commit().catch(logSnapshotError('lecture messages'));
  }, [currentPage, activeConversationId, messages, uid]);

  // --- Profil courant ---
  const currentUser: UserProfile = useMemo(() => {
    if (!authUser) return GUEST;
    const fallbackName = (authUser.email || 'Citoyen').split('@')[0];
    return {
      id: authUser.uid,
      prenom: profile?.prenom || fallbackName,
      nom: profile?.nom || '',
      email: authUser.email || '',
      emailVerified,
      telephone: phone,
      bio: profile?.bio || '',
      vehicule: profile?.vehicule || '',
      avatarUrl: profile?.avatarUrl,
      note: profile?.note ?? 0,
      avisCount: profile?.avisCount ?? 0,
      villeResidence: profile?.villeResidence || '',
      dateInscription: profile?.dateInscription || ''
    };
  }, [authUser, profile, phone, emailVerified]);

  // --- Actions d'authentification ---
  const requireAuth = (): boolean => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      showToast("Connecte-toi ou crée un compte pour continuer.", "info");
      return false;
    }
    return true;
  };

  const signUp = async (data: SignUpData): Promise<string | null> => {
    if (!auth || !db) return "Le site n'est pas encore configuré (Firebase).";
    const tel = normalizePhoneFR(data.telephone);
    if (!tel) return "Numéro de téléphone invalide (format français attendu, ex. 06 12 34 56 78).";
    if (!data.prenom.trim() || !data.nom.trim()) return "Prénom et nom sont obligatoires.";
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);
      const batch = writeBatch(db);
      batch.set(doc(db, 'profils', cred.user.uid), {
        prenom: data.prenom.trim(),
        nom: data.nom.trim(),
        bio: '',
        vehicule: '',
        villeResidence: '',
        note: 0,
        avisCount: 0,
        dateInscription: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      });
      batch.set(doc(db, 'profils', cred.user.uid, 'prive', 'contact'), { telephone: tel });
      await batch.commit();
      await sendEmailVerification(cred.user);
      setIsAuthModalOpen(false);
      showToast("Compte créé ! Un email de confirmation vient de t'être envoyé : clique sur le lien pour pouvoir réserver et publier.", "success");
      return null;
    } catch (err) {
      return authErrorMessage(err);
    }
  };

  const logIn = async (email: string, password: string): Promise<string | null> => {
    if (!auth) return "Le site n'est pas encore configuré (Firebase).";
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setIsAuthModalOpen(false);
      showToast("Content de te revoir !", "success");
      return null;
    } catch (err) {
      return authErrorMessage(err);
    }
  };

  const logOut = async () => {
    if (!auth) return;
    await signOut(auth);
    setCurrentPage('accueil');
    showToast("Tu es déconnecté·e.", "info");
  };

  const resetPassword = async (email: string): Promise<string | null> => {
    if (!auth) return "Le site n'est pas encore configuré (Firebase).";
    if (!email.trim()) return "Saisis d'abord ton adresse email.";
    try {
      await sendPasswordResetEmail(auth, email.trim());
      showToast("Email de réinitialisation envoyé (pense à vérifier tes spams).", "success");
      return null;
    } catch (err) {
      return authErrorMessage(err);
    }
  };

  const resendVerification = async () => {
    if (!auth?.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
      showToast("Email de confirmation renvoyé (pense à vérifier tes spams).", "success");
    } catch (err) {
      showToast(authErrorMessage(err), "error");
    }
  };

  const refreshEmailVerified = async (silent: boolean = false): Promise<boolean> => {
    if (!auth?.currentUser) return false;
    const isSilent = silent;
    try {
      await auth.currentUser.reload();
      // Rafraîchit le jeton pour que les règles Firestore voient email_verified = true
      await auth.currentUser.getIdToken(true);
      const verified = auth.currentUser.emailVerified;
      setEmailVerified(verified);
      if (verified && !emailVerified) {
        showToast("Adresse email confirmée. Tu peux publier et réserver !", "success");
      } else if (!verified && !isSilent) {
        showToast("Ton email n'est pas encore confirmé : clique sur le lien reçu par email.", "warning");
      }
      return verified;
    } catch (err) {
      if (!isSilent) showToast(authErrorMessage(err), "error");
      return false;
    }
  };

  // --- Profil ---
  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    if (!db || !uid) return;
    const firestore = db;
    const { prenom, nom, bio, vehicule, villeResidence, telephone } = updates;
    const publicData = stripUndefined({ prenom, nom, bio, vehicule, villeResidence });

    let tel: string | null = null;
    if (telephone !== undefined) {
      tel = normalizePhoneFR(telephone);
      if (!tel) {
        showToast("Numéro de téléphone invalide (format français attendu).", "error");
        return;
      }
    }

    const batch = writeBatch(firestore);
    if (Object.keys(publicData).length > 0) {
      batch.set(doc(firestore, 'profils', uid), publicData, { merge: true });
    }
    if (tel) {
      batch.set(doc(firestore, 'profils', uid, 'prive', 'contact'), { telephone: tel });
    }
    batch
      .commit()
      .then(() => showToast("Profil citoyen mis à jour avec succès !", "success"))
      .catch((err) => {
        console.error(err);
        showToast("Impossible d'enregistrer le profil. Réessaie.", "error");
      });
  };

  // --- Trajets ---
  const addTrip = (tripData: Omit<Trip, 'id' | 'creeLe' | 'conducteurId' | 'conducteurNom' | 'conducteurBio' | 'conducteurNote' | 'conducteurAvisCount' | 'conducteurTel'>): Trip => {
    if (!db || !isLoggedIn) {
      requireAuth();
      throw new Error("Connexion requise");
    }
    if (!currentUser.emailVerified) {
      showToast("Confirmation d'email obligatoire avant de pouvoir publier une annonce.", "error");
      throw new Error("Email non vérifié");
    }
    if (!currentUser.telephone) {
      showToast("Ajoute ton numéro de téléphone dans ton profil avant de publier.", "error");
      throw new Error("Téléphone manquant");
    }

    const tripRef = doc(collection(db, 'trajets'));
    const newTrip: Trip = {
      ...tripData,
      id: tripRef.id,
      conducteurId: currentUser.id,
      conducteurNom: `${currentUser.prenom} ${currentUser.nom}`.trim(),
      conducteurBio: currentUser.bio,
      conducteurNote: currentUser.note,
      conducteurAvisCount: currentUser.avisCount,
      conducteurTel: currentUser.telephone,
      creeLe: new Date().toISOString().split('T')[0]
    };

    // Le téléphone n'est jamais stocké dans l'annonce publique
    const { id: _id, conducteurTel: _tel, ...publicTrip } = newTrip;
    const batch = writeBatch(db);
    batch.set(tripRef, stripUndefined(publicTrip));
    batch.set(doc(db, 'trajets', tripRef.id, 'contact', 'phone'), { telephone: currentUser.telephone });
    batch.commit().catch((err) => {
      console.error(err);
      showToast("La publication a échoué (vérifie ton email et les champs). Réessaie.", "error");
    });

    showToast("Ton trajet solidaire est en ligne ! Merci pour ta fraternité.", "success");
    return newTrip;
  };

  const deleteTrip = (id: string) => {
    if (!db) return;
    const batch = writeBatch(db);
    batch.delete(doc(db, 'trajets', id, 'contact', 'phone'));
    batch.delete(doc(db, 'trajets', id));
    batch
      .commit()
      .then(() => showToast("L'annonce a été retirée.", "info"))
      .catch((err) => {
        console.error(err);
        showToast("Impossible de retirer l'annonce.", "error");
      });
  };

  // --- Réservations ---
  const createBooking = (tripId: string, places: number = 1, messagePassager?: string): boolean => {
    if (!db || !requireAuth()) return false;

    if (!currentUser.emailVerified) {
      showToast("Vérification d'email requise par lien avant de réserver une place.", "error");
      return false;
    }

    const trip = rawTrips.find((t) => t.id === tripId);
    if (!trip) {
      showToast("Trajet introuvable.", "error");
      return false;
    }

    if (trip.conducteurId === currentUser.id) {
      showToast("C'est ton propre trajet.", "info");
      return false;
    }

    if (trip.placesDisponibles < places) {
      showToast("Désolé, il n'y a plus assez de places disponibles.", "warning");
      return false;
    }

    const alreadyBooked = bookings.some(
      (b) => b.trajetId === tripId && b.passagerId === currentUser.id && b.statut !== 'annulee' && b.statut !== 'refusee'
    );
    if (alreadyBooked) {
      showToast("Tu as déjà une demande ou réservation en cours pour ce trajet.", "info");
      return false;
    }

    const bookingId = `${tripId}_${currentUser.id}`;
    const booking: Omit<Booking, 'id'> = stripUndefined({
      trajetId: tripId,
      conducteurId: trip.conducteurId,
      passagerId: currentUser.id,
      passagerNom: `${currentUser.prenom} ${currentUser.nom}`.trim(),
      passagerTel: currentUser.telephone,
      places,
      statut: 'confirmee' as const, // Confirmée directement : débloque le téléphone du conducteur
      messagePassager,
      dateReservation: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
      createdAt: new Date().toISOString()
    });

    const batch = writeBatch(db);
    batch.set(doc(db, 'reservations', bookingId), booking);
    batch.update(doc(db, 'trajets', tripId), { placesDisponibles: increment(-places) });
    batch
      .commit()
      .then(() => showToast("Ta place est confirmée ! Le numéro de téléphone du conducteur est désormais accessible.", "success"))
      .catch((err) => {
        console.error(err);
        showToast("La réservation a échoué (les places ont peut-être changé). Réessaie.", "error");
      });

    startOrOpenConversation(tripId, trip.conducteurId, trip.conducteurNom);
    return true;
  };

  const cancelBooking = (bookingId: string) => {
    if (!db) return;
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const batch = writeBatch(db);
    batch.delete(doc(db, 'reservations', bookingId));
    batch.update(doc(db, 'trajets', booking.trajetId), { placesDisponibles: increment(booking.places) });
    batch
      .commit()
      .then(() => showToast("Réservation annulée. Les places ont été libérées pour les autres camarades.", "info"))
      .catch((err) => {
        console.error(err);
        showToast("Impossible d'annuler la réservation.", "error");
      });
  };

  const updateBookingStatus = (bookingId: string, status: 'confirmee' | 'refusee') => {
    if (!db) return;
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const batch = writeBatch(db);
    batch.update(doc(db, 'reservations', bookingId), { statut: status });
    // Une demande refusée libère les places
    if (status === 'refusee' && booking.statut !== 'refusee') {
      batch.update(doc(db, 'trajets', booking.trajetId), { placesDisponibles: increment(booking.places) });
    }
    batch
      .commit()
      .then(() =>
        status === 'confirmee'
          ? showToast("Demande acceptée ! Le passager a désormais accès à tes coordonnées.", "success")
          : showToast("Demande refusée.", "info")
      )
      .catch((err) => {
        console.error(err);
        showToast("Action impossible pour le moment.", "error");
      });
  };

  // --- Messagerie ---
  const startOrOpenConversation = (tripId: string, targetUserId: string, targetUserName: string): string => {
    if (!db || !requireAuth()) return '';

    const convId = `${tripId}_${[currentUser.id, targetUserId].sort().join('_')}`;
    const existing = conversations.find((c) => c.id === convId);
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const trip = rawTrips.find((t) => t.id === tripId);
    const iAmDriver = trip?.conducteurId === currentUser.id;
    const nowISO = new Date().toISOString();
    const newConv: Omit<Conversation, 'id'> = {
      trajetId: tripId,
      trajetTitre: trip ? `${trip.villeDepart} → Le Bourget (${trip.heureDepart})` : 'Trajet vers Le Bourget',
      participantIds: [currentUser.id, targetUserId],
      participants: [
        { id: currentUser.id, nom: `${currentUser.prenom} ${currentUser.nom}`.trim(), role: iAmDriver ? 'conducteur' : 'passager' },
        { id: targetUserId, nom: targetUserName, role: iAmDriver ? 'passager' : 'conducteur' }
      ],
      dernierMessage: 'Discussion ouverte pour le trajet.',
      derniereDate: "À l'instant",
      derniereDateISO: nowISO,
      unreadCount: 0
    };

    setDoc(doc(db, 'conversations', convId), newConv).catch((err) => {
      console.error(err);
      showToast("Impossible d'ouvrir la discussion.", "error");
    });
    setActiveConversationId(convId);
    return convId;
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!db || !uid || !text.trim()) return;

    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    const nowISO = new Date().toISOString();
    const msgRef = doc(collection(db, 'conversations', conversationId, 'messages'));
    const message = {
      conversationId,
      trajetId: conv.trajetId,
      expediteurId: uid,
      expediteurNom: `${currentUser.prenom} ${currentUser.nom}`.trim(),
      texte: text.trim(),
      createdAt: nowISO,
      isRead: false
    };

    const firestore = db;
    setDoc(msgRef, message)
      .then(() =>
        updateDoc(doc(firestore, 'conversations', conversationId), {
          dernierMessage: text.trim(),
          derniereDateISO: nowISO
        })
      )
      .catch((err) => {
        console.error(err);
        showToast("Message non envoyé (email à confirmer ?).", "error");
      });
  };

  // --- Signalements ---
  const submitReport = (reportData: Omit<ReportItem, 'id' | 'signaleurId' | 'date' | 'statut'>) => {
    if (!db || !requireAuth()) return;

    const reportRef = doc(collection(db, 'signalements'));
    const newReport: ReportItem = {
      ...reportData,
      id: reportRef.id,
      signaleurId: currentUser.id,
      date: new Date().toISOString(),
      statut: 'en_attente'
    };
    const { id: _id, ...data } = newReport;
    setDoc(reportRef, data)
      .then(() => {
        setReports((prev) => [newReport, ...prev]);
        showToast("Signalement reçu. L'équipe bénévole de modération va examiner l'élément.", "success");
      })
      .catch((err) => {
        console.error(err);
        showToast("Le signalement n'a pas pu être envoyé. Réessaie.", "error");
      });
  };

  return (
    <AppContext.Provider
      value={{
        firebaseReady: isFirebaseConfigured,
        authReady,
        isLoggedIn,
        signUp,
        logIn,
        logOut,
        resetPassword,
        resendVerification,
        refreshEmailVerified: () => refreshEmailVerified(false),
        requireAuth,
        currentPage,
        setCurrentPage,
        selectedTripId,
        setSelectedTripId,
        currentUser,
        updateCurrentUser,
        userReviews,
        trips,
        addTrip,
        deleteTrip,
        searchCity,
        setSearchCity,
        searchSeats,
        setSearchSeats,
        searchDate,
        setSearchDate,
        bookings,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        startOrOpenConversation,
        unreadCount,
        reports,
        submitReport,
        toasts,
        showToast,
        removeToast,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
