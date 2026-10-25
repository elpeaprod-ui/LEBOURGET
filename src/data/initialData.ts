import { Trip, UserProfile, Booking, ChatMessage, Conversation, UserReview } from '../types';

export const INITIAL_USER: UserProfile = {
  id: "user-current",
  prenom: "Sarah",
  nom: "B.",
  email: "sarah.citoyenne@email.fr",
  emailVerified: true,
  telephone: "06 00 11 22 33",
  bio: "Militante pour la justice sociale et la bifurcation écologique. Heureuse de partager la route dans la joie et la solidarité !",
  vehicule: "Renault Clio V Bleue",
  note: 5.0,
  avisCount: 6,
  villeResidence: "Paris 18e",
  dateInscription: "12 octobre 2026"
};

export const INITIAL_REVIEWS: UserReview[] = [
  {
    id: "rev-1",
    auteurNom: "Thomas L.",
    note: 5,
    commentaire: "Trajet impeccable, ponctuelle et très conviviale ! On a refait le monde pendant la route.",
    date: "18 octobre 2026",
    role: "passager"
  },
  {
    id: "rev-2",
    auteurNom: "Aïcha K.",
    note: 5,
    commentaire: "Conduite prudente, super discussion politique et partage rigoureusement équitable des frais.",
    date: "14 octobre 2026",
    role: "passager"
  }
];

// EXACTEMENT UN SEUL TRAJET TEST INITIAL
export const INITIAL_TRIPS: Trip[] = [
  {
    id: "trip-rouen-1",
    conducteurId: "user-yassine",
    conducteurNom: "Yassine M.",
    conducteurBio: "Citoyen engagé, habitué du covoiturage solidaire et des grands débats de route !",
    conducteurNote: 5.0,
    conducteurAvisCount: 12,
    conducteurTel: "07 98 76 54 32",
    villeDepart: "Rouen",
    adresseDepart: "Place Saint-Sever (côté métro)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "11h00",
    heureArriveeEstimee: "12h50",
    typeTrajet: "aller-simple",
    placesTotal: 4,
    placesDisponibles: 3,
    prixParPlace: 9, // Respecte 135km * 0.08 = 10.80€ max légal
    distanceKm: 135,
    vehicule: "Renault Mégane Bleue",
    etapesIntermediaires: ["Gaillon"],
    description: "Trajet direct par l'A13 puis A86. Objectif arrivée vers 12h50 au Bourget pour être bien placés à l'ouverture à 13h ! Playlist populaire et bonne humeur garantie.",
    regles: {
      bagages: "Sacs à dos & valises cabine",
      nonFumeur: true,
      animaux: false,
      pmr: false,
      musiqueOuPodcast: true,
      ambianceTags: ["☕ Pause café", "🎶 Rød — L'Avenir en commun", "⚡ Débats fraternels"]
    },
    creeLe: "2026-10-24"
  }
];

// Réservations initiales : vide par défaut pour permettre de tester la réservation en direct
export const INITIAL_BOOKINGS: Booking[] = [];

// EXACTEMENT UNE SEULE MESSAGERIE TEST INITIALE
export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-rouen-sarah",
    trajetId: "trip-rouen-1",
    trajetTitre: "Rouen → Le Bourget (7 nov)",
    participants: [
      { id: "user-yassine", nom: "Yassine M.", role: "conducteur" },
      { id: "user-current", nom: "Sarah B.", role: "passager" }
    ],
    dernierMessage: "Super Sarah ! On se retrouve Place Saint-Sever vers 10h50.",
    derniereDate: "10:15",
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    conversationId: "conv-rouen-sarah",
    trajetId: "trip-rouen-1",
    expediteurId: "user-current",
    expediteurNom: "Sarah B.",
    texte: "Bonjour Yassine ! Est-ce qu'on aura le temps d'arriver dès l'ouverture des portes à 13h ?",
    timestamp: "10:05",
    isRead: true
  },
  {
    id: "msg-2",
    conversationId: "conv-rouen-sarah",
    trajetId: "trip-rouen-1",
    expediteurId: "user-yassine",
    expediteurNom: "Yassine M.",
    texte: "Salut Sarah ! Oui tout à fait, départ 11h00 pile pour arriver vers 12h50 au Bourget sans stress. Bienvenue à bord !",
    timestamp: "10:12",
    isRead: true
  },
  {
    id: "msg-3",
    conversationId: "conv-rouen-sarah",
    trajetId: "trip-rouen-1",
    expediteurId: "user-yassine",
    expediteurNom: "Yassine M.",
    texte: "On se retrouve Place Saint-Sever vers 10h50 avec le reste de l'équipage. À samedi !",
    timestamp: "10:15",
    isRead: true
  }
];
