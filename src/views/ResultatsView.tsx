import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EVENT_CONFIG } from '../config/event.config';
import { 
  Search, Filter, MapPin, Clock, Users, Car, ArrowUpDown, 
  PlusCircle, Check, X, Coffee, Music, Sparkles, Navigation, 
  ChevronRight, Heart, Smile, ArrowRight 
} from 'lucide-react';
import { TripType } from '../types';
import { motion } from 'motion/react';

export const ResultatsView: React.FC = () => {
  const { 
    trips, 
    searchCity, 
    setSearchCity, 
    searchSeats, 
    setSearchSeats,
    setCurrentPage, 
    setSelectedTripId 
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [filterDate, setFilterDate] = useState<string>('all');
  const [filterPmr, setFilterPmr] = useState<boolean>(false);
  const [filterNonFumeur, setFilterNonFumeur] = useState<boolean>(false);
  const [filterCafe, setFilterCafe] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'heure' | 'prix' | 'places'>('heure');

  // Filtrage intelligent
  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      // Ville
      const matchCity = searchCity
        ? t.villeDepart.toLowerCase().includes(searchCity.toLowerCase()) ||
          t.adresseDepart.toLowerCase().includes(searchCity.toLowerCase()) ||
          (t.etapesIntermediaires && t.etapesIntermediaires.some(e => e.toLowerCase().includes(searchCity.toLowerCase())))
        : true;

      // Places disponibles
      const matchSeats = t.placesDisponibles >= searchSeats;

      // Prix max
      const matchPrice = t.prixParPlace <= maxPrice;

      // Type de trajet
      const matchType = filterType === 'all' ? true : t.typeTrajet === filterType;

      // Date
      const matchDate = filterDate === 'all' ? true : t.dateDepart === filterDate;

      // PMR
      const matchPmr = filterPmr ? t.regles.pmr : true;

      // Non fumeur
      const matchFumeur = filterNonFumeur ? t.regles.nonFumeur : true;

      // Ambiance café
      const matchCafe = filterCafe 
        ? t.regles.ambianceTags?.some(tag => tag.toLowerCase().includes('café') || tag.toLowerCase().includes('thermos'))
        : true;

      return matchCity && matchSeats && matchPrice && matchType && matchDate && matchPmr && matchFumeur && matchCafe;
    }).sort((a, b) => {
      if (sortBy === 'heure') return a.heureDepart.localeCompare(b.heureDepart);
      if (sortBy === 'prix') return a.prixParPlace - b.prixParPlace;
      if (sortBy === 'places') return b.placesDisponibles - a.placesDisponibles;
      return 0;
    });
  }, [trips, searchCity, searchSeats, maxPrice, filterType, filterDate, filterPmr, filterNonFumeur, filterCafe, sortBy]);

  const resetFilters = () => {
    setSearchCity('');
    setSearchSeats(1);
    setFilterType('all');
    setMaxPrice(50);
    setFilterDate('all');
    setFilterPmr(false);
    setFilterNonFumeur(false);
    setFilterCafe(false);
    setSortBy('heure');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-28 space-y-6 text-slate-100">
      
      {/* En-tête Titanium Apple Style */}
      <div className="titanium-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Rassemblement Populaire · Samedi 7 Novembre
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mt-1">
            Trouver un Équipage Solidaire
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {filteredTrips.length} convoi(s) disponible(s) · Partage à prix coûtant sans profit
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('publier')}
          className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(228,0,43,0.3)] flex items-center gap-2 active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Proposer des places libres</span>
        </button>
      </div>

      {/* BARRE DE FILTRES APPLE PRECISION */}
      <div className="titanium-card rounded-2xl p-5 sm:p-6 space-y-4">
        
        {/* Ligne 1 : Champs principaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Ville */}
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold">
              Ville de départ
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Toutes les villes..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Formule */}
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold">
              Formule de trajet
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
            >
              <option value="all" className="bg-[#0A0F1D]">Tous (Aller-retour & Aller simple)</option>
              <option value="aller-retour" className="bg-[#0A0F1D]">Aller-retour uniquement</option>
              <option value="aller-simple" className="bg-[#0A0F1D]">Aller simple</option>
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold">
              Date
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
            >
              <option value="all" className="bg-[#0A0F1D]">Toutes les dates</option>
              <option value="2026-11-07" className="bg-[#0A0F1D]">Samedi 7 nov (Jour J)</option>
              <option value="2026-11-06" className="bg-[#0A0F1D]">Vendredi 6 nov (Veille)</option>
              <option value="2026-11-08" className="bg-[#0A0F1D]">Dimanche 8 nov</option>
            </select>
          </div>

          {/* Tri */}
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold">
              Trier les résultats
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-mono focus:border-red-500 focus:outline-none transition"
            >
              <option value="heure" className="bg-[#0A0F1D]">Heure de départ (croissant)</option>
              <option value="prix" className="bg-[#0A0F1D]">Prix solidaire croissant (€)</option>
              <option value="places" className="bg-[#0A0F1D]">Places restantes disponibles</option>
            </select>
          </div>
        </div>

        {/* Ligne 2 : Filtres de prix & ambiance */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="w-full md:w-64 space-y-1">
            <div className="flex justify-between text-[11px] font-mono uppercase text-slate-400">
              <span>Participation max :</span>
              <span className="text-red-400 font-bold">{maxPrice} €</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#E4002B]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              type="button"
              onClick={() => setFilterCafe(!filterCafe)}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 border ${
                filterCafe ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold' : 'bg-white/[0.04] text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Café / Thermos à bord</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterPmr(!filterPmr)}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 border ${
                filterPmr ? 'bg-blue-600 text-white border-blue-500 font-bold' : 'bg-white/[0.04] text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              <span>♿ Accessible PMR</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterNonFumeur(!filterNonFumeur)}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 border ${
                filterNonFumeur ? 'bg-emerald-600 text-white border-emerald-500 font-bold' : 'bg-white/[0.04] text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              <span>🚭 Non-fumeur</span>
            </button>

            {(searchCity || filterType !== 'all' || filterDate !== 'all' || maxPrice < 50 || filterPmr || filterNonFumeur || filterCafe) && (
              <button
                onClick={resetFilters}
                className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 ml-2 transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RAPPEL HORAIRE CONVIVIAL 13H */}
      <div className="bg-[#080C18] border border-amber-400/30 p-4 rounded-xl text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <strong className="text-white">Conseil d'équipage :</strong> Le rassemblement commence à 15h00. Privilégiez un covoiturage qui arrive <strong>dès 13h00</strong> à l'ouverture des portes pour entrer sans file d'attente.
          </div>
        </div>
        <span className="shrink-0 bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[10px] uppercase font-bold px-3 py-1 rounded-full">
          Entrée libre & gratuite
        </span>
      </div>

      {/* LISTE DES CARTES DE TRAJET */}
      {filteredTrips.length === 0 ? (
        <div className="titanium-card p-12 text-center rounded-2xl border-dashed border-white/10 space-y-4">
          <div className="w-14 h-14 bg-red-950/60 border border-red-500/30 text-[#E4002B] rounded-2xl mx-auto flex items-center justify-center">
            <Car className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl uppercase text-white">
            Aucun équipage disponible pour ces critères
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            {searchCity
              ? `Tu es le premier à chercher depuis « ${searchCity} ». Si tu as un véhicule, sois le conducteur solidaire de ta région !`
              : "Essaie d'élargir tes filtres pour découvrir les convois voisins."}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-white/10 text-xs font-semibold uppercase text-slate-300 hover:text-white rounded-xl bg-white/[0.04]"
            >
              Effacer les filtres
            </button>
            <button
              onClick={() => setCurrentPage('publier')}
              className="bg-gradient-to-r from-[#E4002B] to-[#C90026] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider"
            >
              Proposer ce trajet
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <article
              key={trip.id}
              onClick={() => {
                setSelectedTripId(trip.id);
                setCurrentPage('detail');
              }}
              className="titanium-card rounded-2xl p-5 hover:border-white/20 transition-all duration-200 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
            >
              {/* Colonne Gauche : Horaires & Itinéraire */}
              <div className="space-y-2.5 flex-1">
                
                {/* Badges de tête */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase text-slate-300 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded">
                    {trip.typeTrajet === 'aller-retour' ? 'Aller-Retour' : 'Aller Simple'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {trip.dateDepart === '2026-11-07' ? 'Samedi 7 nov' : trip.dateDepart}
                  </span>
                  {trip.typeTrajet === 'aller-retour' && trip.heureRetour && (
                    <span className="text-xs text-slate-400 font-mono">
                      · Retour ~{trip.heureRetour}
                    </span>
                  )}
                  {trip.regles.pmr && (
                    <span className="bg-blue-950/70 text-blue-300 border border-blue-500/30 text-[10px] font-mono px-2 py-0.5 rounded">
                      ♿ PMR
                    </span>
                  )}
                </div>

                {/* Trajet style Apple flight / road card */}
                <div className="flex items-center gap-3 text-lg font-bold text-white group-hover:text-red-400 transition-colors flex-wrap">
                  <span className="font-heading font-black text-xl text-white font-mono">{trip.heureDepart}</span>
                  <div className="flex items-center gap-1 text-slate-600 font-mono text-xs">
                    <span>──</span>
                    <Car className="w-3.5 h-3.5 text-red-500" />
                    <span>──▶</span>
                  </div>
                  <span className="text-white font-heading font-extrabold">{trip.villeDepart}</span>
                  <span className="text-slate-500 text-xs font-normal">vers</span>
                  <span className="text-slate-300 font-medium">Le Bourget</span>
                  <span className="text-[11px] text-emerald-300 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Arrivée ~{trip.heureArriveeEstimee}
                  </span>
                </div>

                {/* Adresse & étapes */}
                <div className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>RDV : {trip.adresseDepart}</span>
                  </span>
                  {trip.etapesIntermediaires && trip.etapesIntermediaires.length > 0 && (
                    <span className="text-slate-500">
                      (Arrêts : {trip.etapesIntermediaires.join(', ')})
                    </span>
                  )}
                </div>

                {/* Badges d'ambiance */}
                {trip.regles.ambianceTags && trip.regles.ambianceTags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    {trip.regles.ambianceTags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-slate-400 bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Colonne Droite : Conducteur, Prix & Action */}
              <div className="flex items-center gap-5 sm:gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.06] shrink-0">
                
                {/* Conducteur */}
                <div className="text-left md:text-right">
                  <div className="text-xs font-semibold text-white">{trip.conducteurNom}</div>
                  <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1 md:justify-end">
                    <span>★ {trip.conducteurNote}</span>
                    <span className="text-slate-500">({trip.conducteurAvisCount} avis)</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {trip.vehicule}
                  </div>
                </div>

                {/* Prix au km */}
                <div className="text-right">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-white font-mono text-crimson-glow leading-none">
                    {trip.prixParPlace} €
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-mono tracking-wider mt-0.5">
                    par place
                  </div>
                </div>

                {/* Places & Action */}
                <div className="text-right flex flex-col items-end gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-mono rounded ${
                      trip.placesDisponibles > 1
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {trip.placesDisponibles} place(s)
                  </span>
                  
                  <span className="text-xs font-semibold text-red-400 group-hover:text-red-300 flex items-center gap-1 transition">
                    Détails →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
