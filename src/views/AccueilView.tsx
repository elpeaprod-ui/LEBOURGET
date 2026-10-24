import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/event.config';
import { useApp } from '../context/AppContext';
import { 
  Calendar, Clock, MapPin, Users, Car, ArrowRight, 
  PlusCircle, Music, ShieldCheck, 
  Fuel, Leaf, CheckCircle2, Navigation, Radio, ChevronRight, 
  Calculator, Compass, Flame, AlertCircle, Sparkles, Shield
} from 'lucide-react';
import { PlanAccesFrance } from '../components/PlanAccesFrance';
import { CalculateurPrixJuste } from '../components/CalculateurPrixJuste';
import { motion } from 'motion/react';

export const AccueilView: React.FC = () => {
  const { 
    trips, 
    setCurrentPage, 
    setSearchCity, 
    setSearchSeats, 
    setSelectedTripId 
  } = useApp();

  const [localCity, setLocalCity] = useState('');
  const [localSeats, setLocalSeats] = useState(1);

  // Compteurs en direct
  const totalSeats = trips.reduce((acc, t) => acc + t.placesDisponibles, 0);
  const totalTrips = trips.length;
  const totalKmShared = trips.reduce((acc, t) => acc + (t.distanceKm * (t.placesTotal - t.placesDisponibles)), 0) + 1420;
  const co2SavedKg = Math.round(totalKmShared * 0.12);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCity(localCity.trim());
    setSearchSeats(localSeats);
    setCurrentPage('recherche');
  };

  const handleQuickCity = (city: string) => {
    setSearchCity(city);
    setSearchSeats(1);
    setCurrentPage('recherche');
  };

  const featuredTrips = trips.slice(0, 3);

  return (
    <div className="space-y-16 pb-28 text-slate-100">
      
      {/* 1. HERO SECTION : APPLE MACBOOK LANDING PAGE GRADE */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 overflow-hidden border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Eyebrow Pill / Badge style Apple Event */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse" />
            <span className="text-white font-medium">Grand Rassemblement Populaire</span>
            <span className="text-slate-500">·</span>
            <span className="text-amber-300 font-mono">Samedi 7 Novembre 2026</span>
          </motion.div>

          {/* Headline Titre Monumental avec dégradé métallique titanium */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.95]">
              <span className="block text-titanium">MONTRONS</span>
              <span className="block text-crimson-glow">LA FORCE</span>
              <span className="block text-white">DU NOMBRE.</span>
            </h1>
            <p className="font-heading text-lg sm:text-2xl md:text-3xl text-amber-300/90 font-medium tracking-tight">
              Face aux blocages, soyons des dizaines de milliers au Bourget.
            </p>
          </motion.div>

          {/* Manifeste politique & citoyen engagé */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed"
          >
            Face aux restrictions pesant sur la démocratie et la volonté de faire entendre le peuple, le rassemblement massif est notre droit et notre puissance. Pour la convention de « L'Avenir en commun » avec <strong>{EVENT_CONFIG.speaker}</strong>, transformons les routes de France en une chaîne de solidarité : aucun siège vide, tous et toutes au Bourget dès 13h00 !
          </motion.p>

          {/* EVENT SPECIFICATIONS BAR : STYLE APPLE HARDWARE SPECS */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="titanium-card rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-950/80 text-[#E4002B] border border-red-500/30 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Date officielle</div>
                <div className="font-heading font-bold text-lg text-white">{EVENT_CONFIG.dateFormatted}</div>
                <div className="text-[10px] text-amber-400 font-medium">{EVENT_CONFIG.disclaimer.provisional}</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:border-l sm:border-white/10 sm:pl-4">
              <div className="w-11 h-11 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-amber-300 uppercase font-mono tracking-wider">Arrivée conseillée 13h</div>
                <div className="font-heading font-bold text-lg text-amber-300">Portes dès 13h00</div>
                <div className="text-[10px] text-slate-400">Début des prises de parole à 15h00</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:border-l sm:border-white/10 sm:pl-4">
              <div className="w-11 h-11 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Lieu du rassemblement</div>
                <div className="font-bold text-white text-xs leading-tight">{EVENT_CONFIG.venue.name}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{EVENT_CONFIG.venue.address}, {EVENT_CONFIG.venue.city}</div>
              </div>
            </div>
          </motion.div>

          {/* TELEMETRIE SOLIDAIRE : LARGE METRICS APPLE STYLE */}
          <div className="flex items-center justify-center gap-8 sm:gap-14 pt-2">
            <div className="text-center">
              <div className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
                {totalTrips}
              </div>
              <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                Équipages en route
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="font-heading font-black text-3xl sm:text-5xl text-emerald-400 tracking-tight">
                {totalSeats}
              </div>
              <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                Places citoyennes
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="text-center hidden sm:block">
              <div className="font-heading font-black text-3xl sm:text-5xl text-amber-400 tracking-tight font-mono">
                {co2SavedKg} kg
              </div>
              <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                CO₂ évité
              </div>
            </div>
          </div>

          {/* SEARCH CONSOLE DOCK : PRECISION INTERACTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="titanium-card-active rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto text-slate-100 text-left"
          >
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Ville de départ */}
              <div className="md:col-span-5 text-left">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>1. Ville ou gare de départ</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Rouen, Lille, Nantes, Lyon, Marseille..."
                  value={localCity}
                  onChange={(e) => setLocalCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#070B16] text-white font-medium text-sm focus:border-red-500 focus:outline-none transition"
                />
              </div>

              {/* Destination fixée Le Bourget */}
              <div className="md:col-span-4 text-left">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5 font-semibold">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Destination commune</span>
                </label>
                <input
                  type="text"
                  disabled
                  value="Le Bourget (Parc des expos)"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-300 font-medium text-sm cursor-not-allowed truncate"
                />
              </div>

              {/* Bouton de recherche */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1 md:invisible">
                  Action
                </label>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white py-3 px-4 font-heading font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(228,0,43,0.4)] flex items-center justify-center gap-2 active:scale-95 border border-red-500/40"
                >
                  <span>Trouver un trajet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Suggestions rapides de villes */}
            <div className="pt-3 border-t border-white/[0.08] mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                Départs fréquents :
              </span>
              {['Lille', 'Rouen', 'Lyon', 'Nantes', 'Rennes', 'Strasbourg', 'Marseille', 'Orléans', 'Tours', 'Bordeaux'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleQuickCity(city)}
                  className="text-xs bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition border border-white/[0.06] font-medium"
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Raccourcis d'actions rapides style Apple specs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('recherche')}
              className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition"
            >
              Consulter les trajets ({totalTrips})
            </button>
            <button
              onClick={() => setCurrentPage('publier')}
              className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-[0_0_15px_rgba(228,0,43,0.3)] active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Proposer mon véhicule</span>
            </button>
            <a
              href="#plan-france"
              className="bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border border-amber-400/20 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Plan des 6 Couloirs</span>
            </a>
            <a
              href="#calculateur-prix-juste"
              className="bg-white/[0.04] hover:bg-white/[0.08] text-emerald-300 border border-emerald-400/20 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculateur Prix Juste</span>
            </a>
          </div>

          {/* Statut indépendant obligatoire */}
          <div className="pt-4 max-w-3xl mx-auto text-xs text-slate-500 border-t border-white/[0.06]">
            <p>{EVENT_CONFIG.disclaimer.independent}</p>
          </div>
        </div>
      </section>

      {/* 2. BENTO SECTION : BENTO GRID MACBOOK STYLE */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        
        {/* BENTO CARD 1 : LE NOMBRE EST NOTRE FORCE */}
        <div className="titanium-card rounded-2xl p-6 sm:p-8 border border-red-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_0_30px_rgba(228,0,43,0.15)]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-red-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Flame className="w-4 h-4 text-red-400" />
              <span>Rassemblement Populaire & Démocratique</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              LE NOMBRE EST NOTRE FORCE
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Quand le pouvoir tente de décourager l'expression citoyenne, la réponse réside dans la fraternité concrète et le rassemblement massif. En covoiturant pour remplir le Parc des expositions, nous montrons au gouvernement que l'aspiration au changement est majoritaire, organisée et solidaire.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('pourquoi')}
            className="shrink-0 bg-white hover:bg-slate-100 text-neutral-950 px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition shadow-sm active:scale-95"
          >
            Lire la tribune juridique →
          </button>
        </div>

        {/* BENTO CARD 2 : PLAN DES ITINÉRAIRES DEPUIS LES GRANDES VILLES (ANCRE #plan-france) */}
        <div id="plan-france" className="scroll-mt-24">
          <PlanAccesFrance />
        </div>

        {/* BENTO CARD 3 : CALCULATEUR DE PRIX JUSTE (ANCRE #calculateur-prix-juste) */}
        <div id="calculateur-prix-juste" className="scroll-mt-24">
          <CalculateurPrixJuste 
            onApplyPrice={(price, dist) => {
              setSearchCity('');
              setCurrentPage('recherche');
            }}
          />
        </div>

        {/* BENTO CARD 4 : RECOMMANDATION HORAIRE 13H */}
        <div className="titanium-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-semibold">
              <Clock className="w-4 h-4" />
              <span>Recommandation horaire stratégique</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              PORTES OUVERTES DÈS 13H00
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {EVENT_CONFIG.disclaimer.doorsAdvice}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Adresse : {EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.address}, {EVENT_CONFIG.venue.postalCode} {EVENT_CONFIG.venue.city}.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('publier')}
            className="shrink-0 bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(228,0,43,0.3)] active:scale-95"
          >
            Proposer mon départ matinal
          </button>
        </div>

        {/* 3 ÉTAPES : DESIGN CARDS EN ÉCHELONNEMENT STYLE APPLE SPECS */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Organisation solidaire
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="titanium-card rounded-2xl p-6 space-y-3">
              <div className="font-mono text-2xl font-bold text-slate-400">01</div>
              <h3 className="font-heading font-bold text-lg text-white">Trouve ou propose</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Renseigne ta ville de départ ou propose tes places libres dans ta voiture. Fixez une heure de départ pour viser l'arrivée vers 13h.
              </p>
            </div>

            <div className="titanium-card-active rounded-2xl p-6 space-y-3">
              <div className="font-mono text-2xl font-bold text-red-400">02</div>
              <h3 className="font-heading font-bold text-lg text-white">Échange & téléphone privé</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Pose tes questions dans la messagerie sécurisée. Les numéros de téléphone sont verrouillés et ne se révèlent qu'après confirmation mutuelle.
              </p>
            </div>

            <div className="titanium-card rounded-2xl p-6 space-y-3">
              <div className="font-mono text-2xl font-bold text-slate-400">03</div>
              <h3 className="font-heading font-bold text-lg text-white">Partage des frais réels</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Rendez-vous au point convenu. Règlement des frais en main propre, sans commission bancaire et avec un plafond strict de 0,08 €/km.
              </p>
            </div>
          </div>
        </div>

        {/* DERNIERS TRAJETS EN LIGNE */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-red-400">
                Équipages en formation
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Trajets Populaires Disponibles
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('recherche')}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-lg border border-white/10 transition"
            >
              <span>Voir les {totalTrips} trajets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => {
                  setSelectedTripId(trip.id);
                  setCurrentPage('detail');
                }}
                className="titanium-card rounded-2xl p-5 hover:border-white/20 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded">
                      {trip.typeTrajet === 'aller-retour' ? 'Aller-Retour' : 'Aller Simple'}
                    </span>
                    <div className="font-heading font-black text-2xl text-white font-mono text-crimson-glow">
                      {trip.prixParPlace} €
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 font-mono">{EVENT_CONFIG.dateFormatted}</div>
                    <div className="text-lg font-heading font-bold text-white group-hover:text-red-400 transition-colors mt-0.5">
                      {trip.villeDepart} → Le Bourget
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Départ {trip.heureDepart} · Arrivée ~{trip.heureArriveeEstimee}</span>
                    </div>
                  </div>

                  {trip.regles.ambianceTags && trip.regles.ambianceTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {trip.regles.ambianceTags.map((tag, idx) => (
                        <span key={idx} className="bg-white/[0.04] text-slate-300 text-[10px] px-2 py-0.5 rounded border border-white/[0.04]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-slate-400 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E4002B] to-red-800 text-white font-bold text-xs flex items-center justify-center">
                        {trip.conducteurNom[0]}
                      </div>
                      <span className="text-slate-200 font-medium">{trip.conducteurNom}</span>
                    </div>
                    <span className="text-amber-400 font-mono text-xs">★ {trip.conducteurNote}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded ${
                    trip.placesDisponibles > 1 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/70 text-red-300 border border-red-500/30'
                  }`}>
                    {trip.placesDisponibles} place(s) dispo
                  </span>
                  <span className="text-xs font-semibold text-red-400 group-hover:text-red-300 flex items-center gap-1">
                    Réserver →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* L'AUTORADIO DU 7 NOVEMBRE : HK - ON LÂCHE RIEN */}
        <div className="titanium-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider flex items-center gap-1.5 font-semibold">
                <Radio className="w-4 h-4" />
                <span>La Sono de Route</span>
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                HK & LES SALTIMBANKS — « ON LÂCHE RIEN ! »
              </h3>
              <p className="text-xs text-slate-400">
                L'énergie des luttes citoyennes dans l'habitacle pour rythmer la route vers Le Bourget.
              </p>
            </div>

            <a
              href="https://www.youtube.com/watch?v=ysF7Tcw4HbY&list=RDysF7Tcw4HbY&start_radio=1"
              target="_blank"
              rel="noreferrer"
              className="bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition"
            >
              <span>Playlist YouTube</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/ysF7Tcw4HbY?rel=0&modestbranding=1"
                  title="HK & Les Saltimbanks - On lâche rien"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 text-xs text-slate-300">
              <div className="bg-[#070B16] p-4 rounded-xl border border-white/[0.06] space-y-2">
                <div className="text-amber-400 font-mono text-xs uppercase font-semibold">
                  Pourquoi ce titre ?
                </div>
                <p className="leading-relaxed text-slate-400">
                  Symbole des luttes populaires et de la dignité citoyenne, ce morceau fédère les cœurs avant le rassemblement pour aborder la convention de l'Avenir en commun avec enthousiasme et détermination.
                </p>
              </div>

              <div className="bg-[#070B16] p-4 rounded-xl border border-white/[0.06] space-y-1">
                <div className="text-slate-300 font-semibold">Autoradio flottant disponible</div>
                <div className="text-slate-500">
                  Le lecteur reste accessible en permanence via la pastille « Autoradio » en bas de votre écran.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FONDEMENTS CONSTITUTIONNELS BANNER */}
        <div className="titanium-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] font-mono uppercase text-red-400 font-semibold">
              Protection Constitutionnelle
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white">
              « Se rassembler, écouter, débattre : le fondement d'une démocratie vivante. »
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cap sur le Bourget facilite le transport partagé bénévole dans le respect absolu de la loi et de la liberté d'expression garantie par la Constitution de 1958 et la Déclaration de 1789.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('pourquoi')}
            className="shrink-0 bg-white/[0.06] hover:bg-white/[0.1] text-amber-300 border border-amber-400/30 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition"
          >
            Consulter la tribune →
          </button>
        </div>

      </section>
    </div>
  );
};
