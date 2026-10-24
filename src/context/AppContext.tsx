import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Trip, UserProfile, Booking, ChatMessage, Conversation, ReportItem, UserReview 
} from '../types';
import { 
  INITIAL_USER, INITIAL_TRIPS, INITIAL_BOOKINGS, 
  INITIAL_CONVERSATIONS, INITIAL_MESSAGES, INITIAL_REVIEWS 
} from '../data/initialData';

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

interface AppContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedTripId: string | null;
  setSelectedTripId: (id: string | null) => void;
  
  // Utilisateur actuel
  currentUser: UserProfile;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  toggleEmailVerified: () => void;
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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistance LocalStorage sécurisée
  const [currentPage, setCurrentPage] = useState<PageView>('accueil');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('csb_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('csb_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('csb_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('csb_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('csb_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('csb_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [userReviews] = useState<UserReview[]>(INITIAL_REVIEWS);

  // Recherche & Filtres
  const [searchCity, setSearchCity] = useState<string>('');
  const [searchSeats, setSearchSeats] = useState<number>(1);
  const [searchDate, setSearchDate] = useState<string>('2026-11-07');

  // Messagerie active
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-rouen-sarah');

  // Modale Auth
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Synchronisation LocalStorage
  useEffect(() => {
    localStorage.setItem('csb_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('csb_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('csb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('csb_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('csb_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('csb_reports', JSON.stringify(reports));
  }, [reports]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast("Profil citoyen mis à jour avec succès !", "success");
  };

  const toggleEmailVerified = () => {
    const nextState = !currentUser.emailVerified;
    setCurrentUser((prev) => ({ ...prev, emailVerified: nextState }));
    if (nextState) {
      showToast("Adresse email validée par lien de confirmation. Tu peux publier et réserver.", "success");
    } else {
      showToast("Email passé en non-vérifié (mode test de conformité).", "warning");
    }
  };

  const addTrip = (tripData: Omit<Trip, 'id' | 'creeLe' | 'conducteurId' | 'conducteurNom' | 'conducteurBio' | 'conducteurNote' | 'conducteurAvisCount' | 'conducteurTel'>) => {
    if (!currentUser.emailVerified) {
      showToast("Confirmation d'email obligatoire avant de pouvoir publier une annonce.", "error");
      throw new Error("Email non vérifié");
    }

    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      conducteurId: currentUser.id,
      conducteurNom: `${currentUser.prenom} ${currentUser.nom}`,
      conducteurBio: currentUser.bio,
      conducteurNote: currentUser.note,
      conducteurAvisCount: currentUser.avisCount,
      conducteurTel: currentUser.telephone,
      creeLe: new Date().toISOString().split('T')[0]
    };

    setTrips((prev) => [newTrip, ...prev]);
    showToast("Ton trajet solidaire est en ligne ! Merci pour ta fraternité.", "success");
    return newTrip;
  };

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    showToast("L'annonce a été retirée.", "info");
  };

  const createBooking = (tripId: string, places: number = 1, messagePassager?: string): boolean => {
    if (!currentUser.emailVerified) {
      showToast("Vérification d'email requise par lien avant de réserver une place.", "error");
      return false;
    }

    const trip = trips.find((t) => t.id === tripId);
    if (!trip) {
      showToast("Trajet introuvable.", "error");
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

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      trajetId: tripId,
      passagerId: currentUser.id,
      passagerNom: `${currentUser.prenom} ${currentUser.nom}`,
      passagerTel: currentUser.telephone,
      places,
      statut: 'confirmee', // Directement confirmée pour fluidité citoyenne, débloque le téléphone
      messagePassager,
      dateReservation: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
    };

    setBookings((prev) => [newBooking, ...prev]);
    // Décrémenter les places
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, placesDisponibles: t.placesDisponibles - places } : t))
    );

    // Initialiser une conversation si pas encore existante
    startOrOpenConversation(tripId, trip.conducteurId, trip.conducteurNom);

    showToast(
      `Ta place est confirmée ! Le numéro de téléphone du conducteur est désormais accessible.`,
      "success"
    );
    return true;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    // Réinjecter la place dans le trajet
    setTrips((prev) =>
      prev.map((t) => (t.id === booking.trajetId ? { ...t, placesDisponibles: t.placesDisponibles + booking.places } : t))
    );
    showToast("Réservation annulée. Les places ont été libérées pour les autres camarades.", "info");
  };

  const updateBookingStatus = (bookingId: string, status: 'confirmee' | 'refusee') => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return { ...b, statut: status };
      })
    );
    if (status === 'confirmee') {
      showToast("Demande acceptée ! Le passager a désormais accès à tes coordonnées.", "success");
    } else {
      showToast("Demande refusée.", "info");
    }
  };

  const startOrOpenConversation = (tripId: string, targetUserId: string, targetUserName: string): string => {
    // Chercher si conversation existante
    const existing = conversations.find(
      (c) => c.trajetId === tripId && c.participants.some((p) => p.id === currentUser.id) && c.participants.some((p) => p.id === targetUserId)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const trip = trips.find((t) => t.id === tripId);
    const convId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: convId,
      trajetId: tripId,
      trajetTitre: trip ? `${trip.villeDepart} → Le Bourget (${trip.heureDepart})` : 'Trajet vers Le Bourget',
      participants: [
        { id: currentUser.id, nom: `${currentUser.prenom} ${currentUser.nom}`, role: 'passager' },
        { id: targetUserId, nom: targetUserName, role: 'conducteur' }
      ],
      dernierMessage: 'Discussion ouverte pour le trajet.',
      derniereDate: "À l'instant",
      unreadCount: 0
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(convId);
    return convId;
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      trajetId: conv.trajetId,
      expediteurId: currentUser.id,
      expediteurNom: `${currentUser.prenom} ${currentUser.nom}`,
      texte: text.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    setMessages((prev) => [...prev, newMsg]);

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          dernierMessage: text.trim(),
          derniereDate: "À l'instant"
        };
      })
    );
  };

  const unreadCount = messages.filter((m) => m.expediteurId !== currentUser.id && !m.isRead).length;

  const submitReport = (reportData: Omit<ReportItem, 'id' | 'signaleurId' | 'date' | 'statut'>) => {
    const newReport: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      signaleurId: currentUser.id,
      date: new Date().toISOString(),
      statut: 'en_attente'
    };
    setReports((prev) => [newReport, ...prev]);
    showToast("Signalement reçu. L'équipe bénévole de modération va examiner l'élément.", "success");
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedTripId,
        setSelectedTripId,
        currentUser,
        updateCurrentUser,
        toggleEmailVerified,
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
