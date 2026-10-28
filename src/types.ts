export type TripType = 'aller-retour' | 'aller-simple' | 'retour-simple';

export type BookingStatus = 'en_attente' | 'confirmee' | 'refusee' | 'annulee';

export interface UserProfile {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  emailVerified: boolean;
  telephone: string; // Visible uniquement après réservation confirmée
  bio: string;
  vehicule?: string;
  avatarUrl?: string;
  note: number;
  avisCount: number;
  villeResidence?: string;
  dateInscription: string;
}

export interface TripRules {
  bagages: 'Petits sacs uniquement' | 'Sacs à dos & valises cabine' | 'Grands bagages acceptés';
  nonFumeur: boolean;
  animaux: boolean;
  pmr: boolean; // Accessible Personne à Mobilité Réduite
  musiqueOuPodcast: boolean;
  ambianceTags?: string[]; // Ex: "☕ Café thermos", "📻 Podcasts militants", "🚩 Banderoles ok", "🥐 Arrêt croissants"
}

export interface Trip {
  id: string;
  conducteurId: string;
  conducteurNom: string;
  conducteurAvatar?: string;
  conducteurBio: string;
  conducteurNote: number;
  conducteurAvisCount: number;
  conducteurTel: string; // Non exposé publiquement
  villeDepart: string;
  adresseDepart: string;
  destination: string;
  dateDepart: string; // "2026-11-07"
  heureDepart: string; // "10h30"
  heureArriveeEstimee: string; // "12h45"
  typeTrajet: TripType;
  dateRetour?: string;
  heureRetour?: string; // "19h30"
  placesTotal: number;
  placesDisponibles: number;
  prixParPlace: number; // En euros, plafonné
  distanceKm: number;
  vehicule: string;
  etapesIntermediaires?: string[];
  description: string;
  regles: TripRules;
  creeLe: string;
}

export interface Booking {
  id: string;
  trajetId: string;
  conducteurId: string;
  passagerId: string;
  passagerNom: string;
  passagerTel: string;
  places: number;
  statut: BookingStatus;
  messagePassager?: string;
  dateReservation: string;
  createdAt?: string; // ISO, pour le tri
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  trajetId: string;
  expediteurId: string;
  expediteurNom: string;
  texte: string;
  timestamp: string; // affichage (HH:mm)
  createdAt?: string; // ISO, pour le tri
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  trajetId: string;
  trajetTitre: string;
  participantIds: string[];
  participants: {
    id: string;
    nom: string;
    role: 'conducteur' | 'passager';
  }[];
  dernierMessage: string;
  derniereDate: string;
  derniereDateISO?: string;
  unreadCount?: number;
}

export interface ReportItem {
  id: string;
  type: 'trajet' | 'utilisateur';
  cibleId: string;
  cibleNom: string;
  signaleurId: string;
  motif: 'prix_excessif' | 'spam' | 'propos_inappropries' | 'faux_profil' | 'securite';
  details: string;
  date: string;
  statut: 'en_attente' | 'traite';
}

export interface UserReview {
  id: string;
  auteurNom: string;
  note: number;
  commentaire: string;
  date: string;
  role: 'passager' | 'conducteur';
}
