import React, { useState, useMemo } from 'react';
import { KNOWN_CITIES_KM, calculateMaxPrice } from '../utils/distance';
import { Fuel, Users, Calculator, CheckCircle2, AlertTriangle, ArrowRight, Scale, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CalculateurProps {
  onApplyPrice?: (pricePerSeat: number, distance: number) => void;
  initialDistance?: number;
  initialCity?: string;
}

export const CalculateurPrixJuste: React.FC<CalculateurProps> = ({
  onApplyPrice,
  initialDistance = 210,
  initialCity = 'Lille'
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [distanceKm, setDistanceKm] = useState<number>(initialDistance);
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState<number>(1.85); // 1,85 €/L
  const [consumptionL100, setConsumptionL100] = useState<number>(6.2); // 6.2 L / 100km
  const [tollsCost, setTollsCost] = useState<number>(16); // Estimation péage
  const [totalOccupants, setTotalOccupants] = useState<number>(4); // Conducteur + 3 passagers

  // Ajustement automatique lors de la sélection d'une ville
  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    if (cityName && KNOWN_CITIES_KM[cityName]) {
      const km = KNOWN_CITIES_KM[cityName].km;
      setDistanceKm(km);
      setTollsCost(Math.round(km * 0.075));
    }
  };

  // Calculs détaillés
  const {
    fuelCostTotal,
    tripTotalCost,
    pricePerPersonFair,
    pricePerPassenger,
    maxLegalPrice,
    isAboveLegalCap,
    savingsSolo
  } = useMemo(() => {
    const fuelCost = ((distanceKm * consumptionL100) / 100) * fuelPricePerLiter;
    const totalCost = fuelCost + tollsCost;
    
    // Le vrai partage citoyen juste : coût total divisé à parts égales entre tous les occupants
    const perPerson = totalOccupants > 0 ? Math.round((totalCost / totalOccupants) * 10) / 10 : totalCost;
    
    // Le prix demandé par passager
    const perPassengerRounded = Math.max(2, Math.round(perPerson));
    
    // Plafond légal de sécurité (0,08 €/km)
    const legalCap = calculateMaxPrice(distanceKm);
    const aboveCap = perPassengerRounded > legalCap;

    // Économie par passager par rapport à faire le trajet seul en voiture
    const savings = Math.max(0, Math.round(totalCost - perPassengerRounded));

    return {
      fuelCostTotal: Math.round(fuelCost * 100) / 100,
      tripTotalCost: Math.round(totalCost * 100) / 100,
      pricePerPersonFair: perPerson,
      pricePerPassenger: perPassengerRounded,
      maxLegalPrice: legalCap,
      isAboveLegalCap: aboveCap,
      savingsSolo: savings
    };
  }, [distanceKm, consumptionL100, fuelPricePerLiter, tollsCost, totalOccupants]);

  return (
    <div className="titanium-card rounded-2xl p-6 sm:p-8 space-y-6 text-slate-100">
      
      {/* En-tête du calculateur Apple-style */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Précision Réelle · Zéro Bénéfice
            </span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Calculateur du Prix Juste Citoyen
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Partage transparent des frais réels (carburant + péages) répartis équitablement entre occupants.
          </p>
        </div>

        <div className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 shrink-0">
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>Code transports Art. L. 3132-1</span>
        </div>
      </div>

      {/* Formulaire des paramètres du trajet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Choix de la ville */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Point de départ vers Le Bourget
          </label>
          <select
            value={selectedCity}
            onChange={(e) => handleCitySelect(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-sm bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
          >
            {Object.keys(KNOWN_CITIES_KM).sort().map((city) => (
              <option key={city} value={city} className="bg-[#0A0F1D] text-white">
                {city} ({KNOWN_CITIES_KM[city].km} km)
              </option>
            ))}
          </select>
        </div>

        {/* Distance km */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
            <span>Distance estimée</span>
            <span className="font-mono text-slate-500">{distanceKm} km</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="5"
              max="1200"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-sm font-mono bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            />
            <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-500">km</span>
          </div>
        </div>

        {/* Prix du carburant */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
            <span>Prix carburant</span>
            <span className="font-mono text-slate-500">{fuelPricePerLiter.toFixed(2)} €/L</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="1.20"
              max="2.80"
              value={fuelPricePerLiter}
              onChange={(e) => setFuelPricePerLiter(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-sm font-mono bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            />
            <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-500">€/L</span>
          </div>
        </div>

        {/* Consommation véhicule */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
            <span>Conso moyenne</span>
            <span className="font-mono text-slate-500">{consumptionL100} L/100</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="3.5"
              max="12.0"
              value={consumptionL100}
              onChange={(e) => setConsumptionL100(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-sm font-mono bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            />
            <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-500">L/100</span>
          </div>
        </div>

        {/* Péages */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
            <span>Péages estimés</span>
            <span className="font-mono text-slate-500">{tollsCost} €</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="1"
              min="0"
              max="150"
              value={tollsCost}
              onChange={(e) => setTollsCost(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-sm font-mono bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            />
            <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-500">€</span>
          </div>
        </div>

        {/* Nombre d'occupants (Segmented Button Group style Apple) */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Occupants du véhicule
          </label>
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#070B16] border border-white/10 rounded-xl">
            {[2, 3, 4, 5].map((occ) => (
              <button
                key={occ}
                type="button"
                onClick={() => setTotalOccupants(occ)}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  totalOccupants === occ
                    ? 'bg-[#E4002B] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {occ} pers.
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RÉSULTAT DU CALCUL APPLE SPEC DISPLAY */}
      <div className="bg-[#080C18] p-6 rounded-2xl border border-white/10 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Détail du coût global */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Coût réel du véhicule (Aller)
            </div>
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {tripTotalCost.toFixed(2)} €
            </div>
            <div className="text-xs text-slate-400 space-y-1 pt-1 font-mono">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-1">
                <span>Carburant</span>
                <span className="text-slate-200">{fuelCostTotal} €</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Péages</span>
                <span className="text-slate-200">{tollsCost} €</span>
              </div>
            </div>
          </div>

          {/* Prix juste par passager */}
          <div className="bg-gradient-to-b from-[#12192F] to-[#0A0F1D] p-5 rounded-xl border border-red-500/30 text-center space-y-1 shadow-[0_0_20px_rgba(228,0,43,0.15)]">
            <div className="text-[10px] uppercase font-mono tracking-wider text-amber-300 font-semibold">
              Participation par passager
            </div>
            <div className="font-heading font-black text-5xl text-white tracking-tight leading-none text-crimson-glow">
              {pricePerPassenger} €
            </div>
            <div className="text-[11px] text-slate-400">
              Divisé en {totalOccupants} parts égales
            </div>
          </div>

          {/* Économie collective & Plafond */}
          <div className="space-y-2 text-left md:text-right">
            <div className="inline-block bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-mono font-medium">
              ✓ Économie solo : ~{savingsSolo} €
            </div>
            <p className="text-xs text-slate-400">
              Plafond légal strict (0,08 €/km) : <strong className="text-slate-200 font-mono">{maxLegalPrice} € max</strong>
            </p>
            {isAboveLegalCap && (
              <div className="text-xs font-semibold text-red-300 bg-red-950/60 p-2 rounded-lg border border-red-500/50">
                ⚠️ Ce montant dépasse le plafond légal. Réduisez le tarif pour préserver le statut bénévole.
              </div>
            )}
          </div>
        </div>

        {/* Bouton d'application si callback fourni */}
        {onApplyPrice && (
          <div className="pt-3 border-t border-white/[0.08] flex justify-end">
            <button
              type="button"
              onClick={() => onApplyPrice(pricePerPassenger, distanceKm)}
              className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-[0_0_15px_rgba(228,0,43,0.3)] flex items-center gap-2 active:scale-95"
            >
              <span>Appliquer ce tarif solidaire ({pricePerPassenger} €)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#080C18] border border-white/[0.06] rounded-xl text-xs text-slate-400 leading-relaxed flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Principe du partage solidaire :</strong> Aucun profit n'est réalisé. Chaque passager participe à hauteur des dépenses réelles engagées pour permettre la venue du plus grand nombre.
        </span>
      </div>
    </div>
  );
};
