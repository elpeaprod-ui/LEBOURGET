import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Fuel, ShieldCheck, ArrowRight, Compass, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface RouteCorridor {
  id: string;
  nomAxe: string;
  autoroute: string;
  villesPrincipales: string[];
  distanceMoyenne: string;
  dureeMoyenne: string;
  heureDepartConseillee: string;
  peageEstime: string;
  aireRalliement: string;
  conseilTrajet: string;
  villeFiltre: string;
}

export const CORRIDORS_FRANCE: RouteCorridor[] = [
  {
    id: 'axe-nord',
    nomAxe: 'Axe Nord (Hauts-de-France)',
    autoroute: 'Autoroute A1 (Directe)',
    villesPrincipales: ['Lille', 'Lens', 'Arras', 'Amiens', 'Compiègne'],
    distanceMoyenne: '210 km (depuis Lille)',
    dureeMoyenne: '2h15 à 2h45',
    heureDepartConseillee: '10h00 - 10h30',
    peageEstime: '17 €',
    aireRalliement: 'Aire de Wancourt (A1) ou Péage de Chamant',
    conseilTrajet: 'Trajet le plus direct. Sortie 5 (Le Bourget / Parc des expositions) située directement sur l\'A1.',
    villeFiltre: 'Lille'
  },
  {
    id: 'axe-normandie',
    nomAxe: 'Axe Normandie (A13 / A86 Nord)',
    autoroute: 'A13 puis A86 Nord / A1',
    villesPrincipales: ['Rouen', 'Le Havre', 'Caen', 'Évreux'],
    distanceMoyenne: '135 km (depuis Rouen)',
    dureeMoyenne: '1h45 à 2h15',
    heureDepartConseillee: '10h45 - 11h00',
    peageEstime: '9 €',
    aireRalliement: 'Aire de Rosny-sur-Seine ou Morainvilliers',
    conseilTrajet: 'Prendre l\'A86 Nord via Nanterre/Saint-Denis pour rejoindre Le Bourget sans entrer dans Paris intramuros.',
    villeFiltre: 'Rouen'
  },
  {
    id: 'axe-ouest-bretagne',
    nomAxe: 'Axe Ouest & Bretagne (A11 / A81 / A104)',
    autoroute: 'A81 / A11 puis Francilienne (A104)',
    villesPrincipales: ['Rennes', 'Brest', 'Nantes', 'Angers', 'Le Mans'],
    distanceMoyenne: '360 km (Rennes) / 395 km (Nantes)',
    dureeMoyenne: '3h45 à 4h30',
    heureDepartConseillee: '08h00 - 08h30',
    peageEstime: '32 €',
    aireRalliement: 'Aire de Sarthe-Sargé (A11) ou Chartres-Gasville',
    conseilTrajet: 'Éviter le périphérique sud le samedi matin : privilégier la Francilienne A104 Nord jusqu\'à l\'A1.',
    villeFiltre: 'Nantes'
  },
  {
    id: 'axe-sud-rhone',
    nomAxe: 'Axe Sud & Vallée du Rhône (A7 / A6 / A104)',
    autoroute: 'A7 puis A6 et Francilienne A104',
    villesPrincipales: ['Marseille', 'Avignon', 'Valence', 'Lyon', 'Saint-Étienne'],
    distanceMoyenne: '475 km (Lyon) / 785 km (Marseille)',
    dureeMoyenne: '4h30 (Lyon) / 8h00 (Marseille)',
    heureDepartConseillee: '07h00 (Lyon) / Vendredi 6 nov (Marseille)',
    peageEstime: '38 € (Lyon)',
    aireRalliement: 'Aire de Mâcon-Saint-Albain ou Sommesous',
    conseilTrajet: 'Pour Lyon : départ tôt à 7h15 avec thermos. Pour le grand Sud : départs groupés dès le vendredi soir.',
    villeFiltre: 'Lyon'
  },
  {
    id: 'axe-est',
    nomAxe: 'Axe Est & Alsace (A4 / A104)',
    autoroute: 'Autoroute A4 puis A104 vers A1',
    villesPrincipales: ['Strasbourg', 'Metz', 'Nancy', 'Reims', 'Troyes'],
    distanceMoyenne: '480 km (Strasbourg) / 135 km (Reims)',
    dureeMoyenne: '1h30 (Reims) à 4h45 (Strasbourg)',
    heureDepartConseillee: '07h00 (Strasbourg) / 11h15 (Reims)',
    peageEstime: '39 € (Strasbourg) / 12 € (Reims)',
    aireRalliement: 'Aire de Reims-Champagne (A4)',
    conseilTrajet: 'Prendre l\'A104 direction Charles-de-Gaulle puis A1 direction Paris jusqu\'au Bourget.',
    villeFiltre: 'Strasbourg'
  },
  {
    id: 'axe-sud-ouest',
    nomAxe: 'Axe Sud-Ouest & Centre (A10 / A20 / A71)',
    autoroute: 'A10 ou A20 / A71 puis Francilienne A104',
    villesPrincipales: ['Toulouse', 'Bordeaux', 'Limoges', 'Poitiers', 'Tours', 'Orléans'],
    distanceMoyenne: '595 km (Bordeaux) / 145 km (Orléans)',
    dureeMoyenne: '1h45 (Orléans) / 5h45 (Bordeaux)',
    heureDepartConseillee: '10h30 (Orléans) / 06h30 (Bordeaux)',
    peageEstime: '14 € (Orléans) / 55 € (Bordeaux)',
    aireRalliement: 'Aire d\'Orléans-Gidy ou Tours-Val de Loire',
    conseilTrajet: 'Suivre la Francilienne Nord (A104) pour contourner la capitale et arriver droit sur Le Bourget.',
    villeFiltre: 'Orléans'
  }
];

export const PlanAccesFrance: React.FC = () => {
  const { setSearchCity, setCurrentPage } = useApp();
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('axe-nord');

  const selectedCorridor = CORRIDORS_FRANCE.find(c => c.id === selectedCorridorId) || CORRIDORS_FRANCE[0];

  const handleFilterCity = (city: string) => {
    setSearchCity(city);
    setCurrentPage('recherche');
  };

  return (
    <div className="titanium-card rounded-2xl p-6 sm:p-8 space-y-6 text-slate-100">
      
      {/* En-tête Apple-grade */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-semibold">
              Ralliement National · 6 Corridors
            </span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Plan des Itinéraires de Convergence
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronisation des convois populaires pour une arrivée groupée dès 13h00 au Bourget.
          </p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono text-amber-300 flex items-center gap-2 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Sortie A1 n°5 : Le Bourget</span>
        </div>
      </div>

      {/* Sélecteur Apple-style des 6 corridors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CORRIDORS_FRANCE.map((corridor) => {
          const isSelected = corridor.id === selectedCorridor.id;
          return (
            <button
              key={corridor.id}
              onClick={() => setSelectedCorridorId(corridor.id)}
              className={`p-3 rounded-xl text-left transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#18233C] to-[#0E1528] text-white border-red-500/60 shadow-[0_0_15px_rgba(228,0,43,0.25)]'
                  : 'bg-[#070B16] text-slate-400 border-white/[0.06] hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                {corridor.autoroute.split(' ')[0]}
              </div>
              <div className="text-xs font-semibold truncate mt-1">
                {corridor.nomAxe.split('(')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Fiche détaillée de l'axe sélectionné */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCorridor.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-[#070B16] rounded-xl p-5 sm:p-6 border border-white/[0.08] space-y-5"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-semibold">
                Couloir de mobilisation
              </span>
              <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight mt-0.5">
                {selectedCorridor.nomAxe}
              </h4>
              <div className="text-xs text-slate-400 font-medium">
                Itinéraire recommandé : <strong className="text-slate-200">{selectedCorridor.autoroute}</strong>
              </div>
            </div>

            <button
              onClick={() => handleFilterCity(selectedCorridor.villeFiltre)}
              className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-[0_0_15px_rgba(228,0,43,0.3)] flex items-center gap-2 active:scale-95 shrink-0"
            >
              <span>Trajets sur cet axe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grille des caractéristiques Apple Spec Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#0D1322] p-3.5 rounded-xl border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                <span>Villes clés</span>
              </div>
              <div className="text-xs font-semibold text-white">
                {selectedCorridor.villesPrincipales.join(' · ')}
              </div>
            </div>

            <div className="bg-[#0D1322] p-3.5 rounded-xl border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Départ conseillé</span>
              </div>
              <div className="text-xs font-bold text-amber-300 font-mono">
                {selectedCorridor.heureDepartConseillee}
              </div>
              <div className="text-[10px] text-slate-500">Pour arriver à 13h00</div>
            </div>

            <div className="bg-[#0D1322] p-3.5 rounded-xl border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-red-400" />
                <span>Distance & Péage</span>
              </div>
              <div className="text-xs font-bold text-white font-mono">
                {selectedCorridor.distanceMoyenne}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Péage indicatif : {selectedCorridor.peageEstime}</div>
            </div>

            <div className="bg-[#0D1322] p-3.5 rounded-xl border border-white/[0.06] space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aire de ralliement</span>
              </div>
              <div className="text-xs font-semibold text-white truncate" title={selectedCorridor.aireRalliement}>
                {selectedCorridor.aireRalliement}
              </div>
            </div>
          </div>

          {/* Conseil d'accès spécifique */}
          <div className="bg-white/[0.03] border border-white/[0.08] p-3.5 rounded-xl text-xs text-slate-300 flex items-start gap-3">
            <span className="text-base shrink-0">🚗</span>
            <div>
              <strong className="text-white font-semibold">Conseil d'approche :</strong> {selectedCorridor.conseilTrajet}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Plan interactif terminal au Bourget */}
      <div className="bg-[#080C18] p-5 rounded-xl border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-amber-400 font-mono text-xs uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Coordonnées GPS officielles :</span>
          </div>
          <div className="text-sm font-semibold text-white mt-1">
            Parc des expositions Paris Le Bourget — Carrefour Charles Lindbergh, 93350 Le Bourget
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Accès direct Autoroute A1 (Sortie 5) · RER B (Gare Le Bourget) + Navettes dédiées
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Parc+des+expositions+Paris+Le+Bourget+Carrefour+Charles+Lindbergh+93350+Le+Bourget"
          target="_blank"
          rel="noreferrer"
          className="bg-white/[0.06] hover:bg-white hover:text-neutral-950 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition border border-white/10 shrink-0 flex items-center gap-2 active:scale-95"
        >
          <span>Ouvrir dans Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
