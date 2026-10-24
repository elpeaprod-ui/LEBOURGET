/**
 * Configuration centrale de l'événement.
 * Toutes les informations de date, heure, lieu et mentions légales obligatoires
 * sont centralisées ici pour une modification aisée.
 */
export const EVENT_CONFIG = {
  name: "Convention & Grand Meeting - Présentation de « L'Avenir en commun »",
  speaker: "Jean-Luc Mélenchon",
  tagline: "Covoiturons ensemble pour le 7 novembre",
  dateFormatted: "Samedi 7 novembre",
  dateISO: "2026-11-07",
  doorsOpenTime: "13h00",
  startTime: "15h00",
  venue: {
    name: "Parc des expositions Paris Le Bourget",
    hall: "Hall d'exposition principal",
    address: "Carrefour Charles Lindbergh",
    postalCode: "93350",
    city: "Le Bourget",
    region: "Île-de-France (Seine-Saint-Denis)",
    accessNotes: "RER B (Gare Le Bourget) puis navettes dédiées ou bus 350. Autoroute A1 sortie 5. Parking sur place accessible.",
    coordinates: {
      lat: 48.9416,
      lng: 2.4338
    }
  },
  disclaimer: {
    independent: "Site indépendant, créé par des citoyens. Non affilié officiellement à La France insoumise. Retrouvez les informations officielles de l'événement sur les canaux de LFI.",
    provisional: "Informations à confirmer sur les canaux officiels.",
    doorsAdvice: "Événement gratuit et ouvert à toutes et tous ; il est vivement conseillé d'arriver dès l'ouverture des portes, vers 13h, pour réduire l'attente à l'entrée.",
    doorsAdviceShort: "Portes ouvertes dès 13h00 (début 15h00) : prévoyez d'arriver tôt !",
    financialRules: "Plateforme citoyenne et bénévole : aucun paiement en ligne. La participation aux frais se fait de la main à la main, dans la limite stricte du partage des coûts réels de carburant et de péage (aucun bénéfice)."
  },
  // Plafond de partage de frais : barème indicatif covoiturage strict (max 0,08 € par km et par passager)
  costCapPerKm: 0.08,
  // Liens officiels externes
  officialLinks: {
    lfiWebsite: "https://lafranceinsoumise.fr",
    actionPopulaire: "https://actionpopulaire.fr"
  }
};
