import { Trip, UserProfile, Booking, ChatMessage, Conversation, UserReview } from '../types';

export const INITIAL_USER: UserProfile = {
  id: "user-current",
  prenom: "Sarah",
  nom: "B.",
  email: "sarah.citoyenne@email.fr",
  emailVerified: true,
  telephone: "06 00 11 22 33",
  bio: "Militante pour la 6e République et la bifurcation écologique. Heureuse de partager la route dans la joie et la solidarité !",
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
    commentaire: "Trajet impeccable, ponctuelle et très conviviale ! On a refait le monde pendant 2 heures.",
    date: "18 octobre 2026",
    role: "passager"
  },
  {
    id: "rev-2",
    auteurNom: "Aïcha K.",
    note: 5,
    commentaire: "Conduite souple et prudente, super discussion politique et partage équitable des frais.",
    date: "14 octobre 2026",
    role: "passager"
  }
];

export const INITIAL_TRIPS: Trip[] = [
  {
    id: "trip-lille-1",
    conducteurId: "user-camille",
    conducteurNom: "Camille R.",
    conducteurBio: "Militante syndicale et associative dans le Nord. Départ à l'heure pour ne rien rater !",
    conducteurNote: 4.9,
    conducteurAvisCount: 16,
    conducteurTel: "06 12 34 56 78",
    villeDepart: "Lille",
    adresseDepart: "Gare Lille Flandres (devant le parvis)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "10h15",
    heureArriveeEstimee: "12h40",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-07",
    heureRetour: "19h30",
    placesTotal: 3,
    placesDisponibles: 2,
    prixParPlace: 14, // Respecte 210km * 0.08 = 16.80€ max
    distanceKm: 210,
    vehicule: "Peugeot 208 Blanche",
    etapesIntermediaires: ["Arras (péage)", "Compiègne"],
    description: "Départ matinal pour arriver dès l'ouverture des portes à 13h ! Pause café prévue sur l'A1. On écoute des podcasts militants ou on discute tranquillement.",
    regles: {
      bagages: "Sacs à dos & valises cabine",
      nonFumeur: true,
      animaux: false,
      pmr: true,
      musiqueOuPodcast: true,
      ambianceTags: ["☕ Café thermos chaud", "📻 Podcasts & débats", "🥐 Arrêt boulangerie"]
    },
    creeLe: "2026-10-20"
  },
  {
    id: "trip-rouen-2",
    conducteurId: "user-yassine",
    conducteurNom: "Yassine M.",
    conducteurBio: "Engagé pour le bien commun, habitué du covoiturage solidaire et des grands débats de route !",
    conducteurNote: 5.0,
    conducteurAvisCount: 9,
    conducteurTel: "07 98 76 54 32",
    villeDepart: "Rouen",
    adresseDepart: "Place Saint-Sever (côté métro)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "11h00",
    heureArriveeEstimee: "12h50",
    typeTrajet: "aller-simple",
    placesTotal: 4,
    placesDisponibles: 2,
    prixParPlace: 9, // Respecte 135km * 0.08 = 10.80€ max
    distanceKm: 135,
    vehicule: "Renault Megane Bleue",
    etapesIntermediaires: ["Gaillon"],
    description: "Trajet direct par l'A13 puis A86. Objectif arrivée vers 12h50 au Bourget pour être bien placés à l'ouverture à 13h ! Playlist festive et bonne humeur garantie.",
    regles: {
      bagages: "Sacs à dos & valises cabine",
      nonFumeur: true,
      animaux: false,
      pmr: false,
      musiqueOuPodcast: true,
      ambianceTags: ["🚩 Banderoles ok", "🎶 Playlist populaire", "⚡ Débats fraternels"]
    },
    creeLe: "2026-10-21"
  },
  {
    id: "trip-lyon-3",
    conducteurId: "user-helene",
    conducteurNom: "Hélène & Thomas",
    conducteurBio: "Couple d'enseignants mobilisés pour l'éducation publique, heureux de partager les kilomètres.",
    conducteurNote: 4.8,
    conducteurAvisCount: 22,
    conducteurTel: "06 55 44 33 22",
    villeDepart: "Lyon",
    adresseDepart: "Métro Parilly / Entrée périphérique",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "07h15",
    heureArriveeEstimee: "12h45",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-07",
    heureRetour: "20h00",
    placesTotal: 3,
    placesDisponibles: 1,
    prixParPlace: 28, // Respecte 475km * 0.08 = 38€ max
    distanceKm: 475,
    vehicule: "Citroën C4 Gris métallisé",
    etapesIntermediaires: ["Mâcon", "Auxerre"],
    description: "Départ à 7h15 avec thermos de café chaud ! Pause sur l'A6. On vise une arrivée à 12h45 pour le déjeuner sur le pouce avant l'ouverture des portes à 13h. Retour après les discours.",
    regles: {
      bagages: "Grands bagages acceptés",
      nonFumeur: true,
      animaux: true,
      pmr: false,
      musiqueOuPodcast: true,
      ambianceTags: ["☕ Thermos XXL & biscuits", "💬 Passion politique", "🐕 Chien calme bienvenu"]
    },
    creeLe: "2026-10-19"
  },
  {
    id: "trip-nantes-4",
    conducteurId: "user-gwen",
    conducteurNom: "Gwenaëlle D.",
    conducteurBio: "Soignante à l'hôpital de Nantes, engagée pour la santé publique et la justice fiscale.",
    conducteurNote: 4.9,
    conducteurAvisCount: 11,
    conducteurTel: "06 88 12 99 44",
    villeDepart: "Nantes",
    adresseDepart: "Gare Sud (Accès Navette)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "08h00",
    heureArriveeEstimee: "12h55",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-07",
    heureRetour: "19h45",
    placesTotal: 4,
    placesDisponibles: 3,
    prixParPlace: 26, // 395km * 0.08 = 31.60€ max
    distanceKm: 395,
    vehicule: "Toyota Yaris Hybride",
    etapesIntermediaires: ["Angers", "Le Mans"],
    description: "Voiture confortable et économique. On peut récupérer du monde à la sortie d'Angers ou au Mans. Arrivée prévue pile pour 13h.",
    regles: {
      bagages: "Sacs à dos & valises cabine",
      nonFumeur: true,
      animaux: false,
      pmr: true,
      musiqueOuPodcast: true
    },
    creeLe: "2026-10-22"
  },
  {
    id: "trip-rennes-5",
    conducteurId: "user-erwan",
    conducteurNom: "Erwan B.",
    conducteurBio: "Étudiant en sociologie et militant écologiste. Covoiturons pour limiter l'empreinte carbone !",
    conducteurNote: 4.7,
    conducteurAvisCount: 7,
    conducteurTel: "07 44 33 22 11",
    villeDepart: "Rennes",
    adresseDepart: "Esplanade Charles de Gaulle (devant l'Espace des Sciences)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "08h30",
    heureArriveeEstimee: "12h50",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-07",
    heureRetour: "20h30",
    placesTotal: 3,
    placesDisponibles: 2,
    prixParPlace: 24, // 360km * 0.08 = 28.80€ max
    distanceKm: 360,
    vehicule: "Volkswagen Golf",
    etapesIntermediaires: ["Laval"],
    description: "Ambiance studieuse et détendue. Possibilité de faire un stop à Laval. Départ retour vers 20h30 pour laisser le temps de débriefer et saluer les camarades.",
    regles: {
      bagages: "Sacs à dos & valises cabine",
      nonFumeur: true,
      animaux: false,
      pmr: false,
      musiqueOuPodcast: true
    },
    creeLe: "2026-10-23"
  },
  {
    id: "trip-strasbourg-6",
    conducteurId: "user-lucas",
    conducteurNom: "Lucas V.",
    conducteurBio: "Cheminot et citoyen insoumis alsacien. Solidarité totale sur la route !",
    conducteurNote: 5.0,
    conducteurAvisCount: 14,
    conducteurTel: "06 77 88 99 00",
    villeDepart: "Strasbourg",
    adresseDepart: "Gare Centrale (Place de la Gare)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "07h00",
    heureArriveeEstimee: "12h45",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-07",
    heureRetour: "20h00",
    placesTotal: 4,
    placesDisponibles: 2,
    prixParPlace: 32, // 480km * 0.08 = 38.40€ max
    distanceKm: 480,
    vehicule: "Skoda Octavia Break",
    etapesIntermediaires: ["Metz (échangeur A4)", "Reims"],
    description: "Grand coffre spacieux pour banderoles et sacs. Passage par Metz et Reims. Arrivée à 12h45 pour être parmi les premiers dans la salle !",
    regles: {
      bagages: "Grands bagages acceptés",
      nonFumeur: true,
      animaux: true,
      pmr: true,
      musiqueOuPodcast: true
    },
    creeLe: "2026-10-18"
  },
  {
    id: "trip-marseille-7",
    conducteurId: "user-nadia",
    conducteurNom: "Nadia F.",
    conducteurBio: "Animatrice sociale marseillaise. Montée collective pour porter la voix des quartiers populaires !",
    conducteurNote: 4.9,
    conducteurAvisCount: 26,
    conducteurTel: "06 33 22 11 00",
    villeDepart: "Marseille",
    adresseDepart: "Métro La Rose / Parking relais",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-06", // Départ la veille
    heureDepart: "16h00",
    heureArriveeEstimee: "23h30",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-08", // Retour le lendemain
    heureRetour: "10h00",
    placesTotal: 4,
    placesDisponibles: 1,
    prixParPlace: 42, // Longue distance ~785km
    distanceKm: 785,
    vehicule: "Renault Grand Scenic 7 places",
    etapesIntermediaires: ["Avignon", "Valence", "Lyon"],
    description: "Départ le vendredi 6 novembre en fin d'après-midi, hébergement solidaire en Île-de-France, présence le samedi 7 au Bourget dès 12h30, et retour tranquille le dimanche matin.",
    regles: {
      bagages: "Grands bagages acceptés",
      nonFumeur: true,
      animaux: false,
      pmr: true,
      musiqueOuPodcast: true
    },
    creeLe: "2026-10-17"
  },
  {
    id: "trip-orleans-8",
    conducteurId: "user-julien",
    conducteurNom: "Julien P.",
    conducteurBio: "Artisan électricien, partisan de la planification écologique.",
    conducteurNote: 4.8,
    conducteurAvisCount: 5,
    conducteurTel: "07 11 22 33 44",
    villeDepart: "Orléans",
    adresseDepart: "Gare d'Orléans (Parvis Nord)",
    destination: "Parc des expositions Paris Le Bourget",
    dateDepart: "2026-11-07",
    heureDepart: "10h30",
    heureArriveeEstimee: "12h40",
    typeTrajet: "aller-retour",
    dateRetour: "2026-11-07",
    heureRetour: "19h30",
    placesTotal: 3,
    placesDisponibles: 3,
    prixParPlace: 10,
    distanceKm: 145,
    vehicule: "Ford Focus",
    description: "Trajet fluide via l'A10 puis Francilienne / A1. Arrivée à 12h40 au Bourget. Ambiance solidaire et détendue.",
    regles: {
      bagages: "Sacs à dos & valises cabine",
      nonFumeur: true,
      animaux: false,
      pmr: false,
      musiqueOuPodcast: true
    },
    creeLe: "2026-10-23"
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "book-initial-1",
    trajetId: "trip-rouen-2",
    passagerId: "user-current",
    passagerNom: "Sarah B.",
    passagerTel: "06 00 11 22 33",
    places: 1,
    statut: "confirmee",
    messagePassager: "Salut camarade, je prends 1 place depuis Saint-Sever !",
    dateReservation: "2026-10-22 14:30"
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-rouen-sarah",
    trajetId: "trip-rouen-2",
    trajetTitre: "Rouen → Le Bourget (7 nov)",
    participants: [
      { id: "user-yassine", nom: "Yassine M.", role: "conducteur" },
      { id: "user-current", nom: "Sarah B.", role: "passager" }
    ],
    dernierMessage: "Super Sarah ! On se retrouve Place Saint-Sever vers 10h50.",
    derniereDate: "10:15",
    unreadCount: 1
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    conversationId: "conv-rouen-sarah",
    trajetId: "trip-rouen-2",
    expediteurId: "user-current",
    expediteurNom: "Sarah B.",
    texte: "Bonjour Yassine ! J'ai bien réservé une place. Est-ce qu'on aura le temps d'arriver dès 13h ?",
    timestamp: "Hier à 18:20",
    isRead: true
  },
  {
    id: "msg-2",
    conversationId: "conv-rouen-sarah",
    trajetId: "trip-rouen-2",
    expediteurId: "user-yassine",
    expediteurNom: "Yassine M.",
    texte: "Salut Sarah ! Oui tout à fait, départ 11h pile pour arriver avant 13h au Bourget sans stress. Bienvenue à bord !",
    timestamp: "Hier à 19:05",
    isRead: true
  },
  {
    id: "msg-3",
    conversationId: "conv-rouen-sarah",
    trajetId: "trip-rouen-2",
    expediteurId: "user-yassine",
    expediteurNom: "Yassine M.",
    texte: "On se retrouve Place Saint-Sever vers 10h50 avec le reste de l'équipage. À samedi !",
    timestamp: "Aujourd'hui à 10:15",
    isRead: false
  }
];
