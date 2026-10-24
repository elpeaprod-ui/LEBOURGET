import { EVENT_CONFIG } from '../config/event.config';

// Distances routières approximatives en kilomètres vers Le Bourget (93350)
export const KNOWN_CITIES_KM: Record<string, { km: number; region: string }> = {
  'Paris': { km: 15, region: 'Île-de-France' },
  'Saint-Denis': { km: 8, region: 'Île-de-France' },
  'Cergy': { km: 38, region: 'Île-de-France' },
  'Evry': { km: 50, region: 'Île-de-France' },
  'Melun': { km: 65, region: 'Île-de-France' },
  'Meaux': { km: 45, region: 'Île-de-France' },
  'Lille': { km: 210, region: 'Hauts-de-France' },
  'Amiens': { km: 125, region: 'Hauts-de-France' },
  'Rouen': { km: 135, region: 'Normandie' },
  'Le Havre': { km: 200, region: 'Normandie' },
  'Caen': { km: 240, region: 'Normandie' },
  'Rennes': { km: 360, region: 'Bretagne' },
  'Brest': { km: 590, region: 'Bretagne' },
  'Nantes': { km: 395, region: 'Pays de la Loire' },
  'Angers': { km: 310, region: 'Pays de la Loire' },
  'Le Mans': { km: 220, region: 'Pays de la Loire' },
  'Tours': { km: 250, region: 'Centre-Val de Loire' },
  'Orléans': { km: 145, region: 'Centre-Val de Loire' },
  'Bourges': { km: 260, region: 'Centre-Val de Loire' },
  'Reims': { km: 135, region: 'Grand Est' },
  'Metz': { km: 320, region: 'Grand Est' },
  'Nancy': { km: 375, region: 'Grand Est' },
  'Strasbourg': { km: 480, region: 'Grand Est' },
  'Troyes': { km: 175, region: 'Grand Est' },
  'Dijon': { km: 330, region: 'Bourgogne-Franche-Comté' },
  'Besançon': { km: 410, region: 'Bourgogne-Franche-Comté' },
  'Lyon': { km: 475, region: 'Auvergne-Rhône-Alpes' },
  'Saint-Étienne': { km: 530, region: 'Auvergne-Rhône-Alpes' },
  'Grenoble': { km: 585, region: 'Auvergne-Rhône-Alpes' },
  'Clermont-Ferrand': { km: 435, region: 'Auvergne-Rhône-Alpes' },
  'Bordeaux': { km: 595, region: 'Nouvelle-Aquitaine' },
  'Poitiers': { km: 350, region: 'Nouvelle-Aquitaine' },
  'Limoges': { km: 405, region: 'Nouvelle-Aquitaine' },
  'Toulouse': { km: 690, region: 'Occitanie' },
  'Montpellier': { km: 760, region: 'Occitanie' },
  'Perpignan': { km: 860, region: 'Occitanie' },
  'Marseille': { km: 785, region: 'PACA' },
  'Nice': { km: 940, region: 'PACA' },
  'Toulon': { km: 850, region: 'PACA' },
  'Avignon': { km: 700, region: 'PACA' },
};

/**
 * Estime la distance en kilomètres entre une ville et Le Bourget
 */
export function estimateDistance(cityName: string): number {
  if (!cityName) return 150;
  const clean = cityName.trim().toLowerCase();
  
  for (const [name, data] of Object.entries(KNOWN_CITIES_KM)) {
    if (name.toLowerCase() === clean || clean.includes(name.toLowerCase())) {
      return data.km;
    }
  }
  return 180; // Distance par défaut
}

/**
 * Calcule le plafond maximal autorisé pour un trajet selon le barème kilométrique
 * (Strict partage des frais sans profit : max 0,08 € / km / place)
 */
export function calculateMaxPrice(distanceKm: number): number {
  const cap = Math.round(distanceKm * EVENT_CONFIG.costCapPerKm);
  return Math.max(3, cap); // Minimum 3€ symbolique pour couvrir les frais minimums
}

/**
 * Calcule une estimation du temps de route moyen en minutes
 */
export function estimateTravelDurationMinutes(distanceKm: number): number {
  // Compter ~85 km/h de moyenne nationale avec accès Île-de-France
  return Math.round((distanceKm / 85) * 60);
}
