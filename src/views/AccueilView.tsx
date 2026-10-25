import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/event.config';
import { useApp } from '../context/AppContext';
import { 
  Calendar, Clock, MapPin, Users, Car, ArrowRight, 
  PlusCircle, Radio, ChevronRight, Calculator, Compass, Flame, Shield, ArrowUpRight
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
  const totalKmShared = trips.reduce((acc, t) => acc + (t.distanceKm * (t.placesTotal - t.placesDisponibles)), 0) + 135;
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
      
      {/* 1. HERO SECTION : HIGH-CRAFT TITANIUM MACBOOK AESTHETIC */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 overflow-hidden border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          
          {/* Eyebrow Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse" />
            <span className="text-white font-medium">Grand Rassemblement Populaire</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-300 font-mono">Samedi 7 Novembre 2026</span>
          </motion.div>

          {/* Headline Monumental */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-2"
          >
            <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.95]">
              <span className="block text-titanium">MONTRONS</span>
              <span className="block text-crimson-glow">LA FORCE</span>
              <span className="block text-white">DU NOMBRE.</span>
            </h1>
            <p className="font-heading text-lg sm:text-2xl text-amber-300/90 font-medium tracking-tight max-w-2xl mx-auto">
              Face aux blocages, soyons des dizaines de milliers au Bourget.
            </p>
          </motion.div>

          {/* Description claire et engagée */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed"
          >
            Pour la grande convention populaire avec <strong>{EVENT_CONFIG.speaker}</strong>, organisons le ralliement de tous les territoires. Covoiturons à prix coûtant, sans intermédiaire ni commission : aucun siège vide, tous et toutes au Bourget dès 13h00 !
          </motion.p>

          {/* EVENT SPECIFICATIONS BAR : HARDWARE PRECISION */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="titanium-card rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 text-[#E4002B] border border-red-500/30 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Date officielle</div>
                <div className="font-heading font-bold text-base text-white">{EVENT_CONFIG.dateFormatted}</div>
                <div className="text-[10px] text-amber-400 font-medium">{EVENT_CONFIG.disclaimer.provisional}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-4">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-amber-300 uppercase font-mono tracking-wider">Arrivée conseillée 13h</div>
                <div className="font-heading font-bold text-base text-amber-300">Portes dès 13h00</div>
                <div className="text-[10px] text-slate-400">Prises de parole dès 15h00</div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-4">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Lieu du rassemblement</div>
                <div className="font-bold text-white text-xs leading-tight">{EVENT_CONFIG.venue.name}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{EVENT_CONFIG.venue.city} (accès RER B / A1)</div>
              </div>
            </div>
          </motion.div>

          {/* TELEMETRIE SOLIDAIRE */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 pt-1">
            <div className="text-center">
              <div className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {totalTrips}
              </div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                Convoi test actif
              </div>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-center">
              <div className="font-heading font-black text-2xl sm:text-4xl text-emerald-400 tracking-tight">
                {totalSeats}
              </div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                Places citoyennes libres
              </div>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div className="text-center hidden sm:block">
              <div className="font-heading font-black text-2xl sm:text-4xl text-amber-400 tracking-tight font-mono">
                0,08 €/km
              </div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
                Plafond strict sans profit
              </div>
            </div>
          </div>

          {/* SEARCH CONSOLE DOCK */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="titanium-card-active rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto text-slate-100 text-left"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#070B16] text-white font-medium text-xs sm:text-sm focus:border-red-500 focus:outline-none transition"
                />
              </div>

              {/* Destination fixée Le Bourget */}
              <div className="md:col-span-4 text-left">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5 font-semibold">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Destination commune</span>
                </label>
                <input
                  type="text"
                  disabled
                  value="Le Bourget (Parc des expos)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-300 font-medium text-xs sm:text-sm cursor-not-allowed truncate"
                />
              </div>

              {/* Bouton de recherche */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1 md:invisible">
                  Action
                </label>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white py-2.5 px-4 font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(228,0,43,0.4)] flex items-center justify-center gap-2 active:scale-95 border border-red-500/40"
                >
                  <span>Trouver un trajet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Suggestions rapides de villes */}
            <div className="pt-3 border-t border-white/[0.08] mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Villes clés :
              </span>
              {['Rouen (Trajet test)', 'Lille', 'Lyon', 'Nantes', 'Rennes', 'Strasbourg', 'Marseille', 'Tours', 'Bordeaux'].map((city) => {
                const cleanName = city.replace(' (Trajet test)', '');
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleQuickCity(cleanName)}
                    className="text-xs bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition border border-white/[0.06] font-medium"
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Raccourcis d'actions rapides */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
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

          {/* Statut indépendant légal */}
          <div className="pt-3 max-w-3xl mx-auto text-[11px] text-slate-500 border-t border-white/[0.06]">
            <p>{EVENT_CONFIG.disclaimer.independent}</p>
          </div>
        </div>
      </section>

      {/* 2. SECTION TRAJET TEST & PROPOSITIONS */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Convoi citoyen en ligne</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
              Trajet Test Disponible
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('recherche')}
            className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-lg border border-white/10 transition"
          >
            <span>Explorer la recherche</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Disposition épurée : Carte Trajet Test + Carte Action Proposer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {featuredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => {
                setSelectedTripId(trip.id);
                setCurrentPage('detail');
              }}
              className="md:col-span-7 titanium-card-active rounded-2xl p-6 hover:border-red-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-[0_0_25px_rgba(228,0,43,0.15)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                      Trajet Test Officiel
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded">
                      Aller Simple
                    </span>
                  </div>
                  <div className="font-heading font-black text-3xl text-white font-mono text-crimson-glow">
                    {trip.prixParPlace} €
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-mono">{EVENT_CONFIG.dateFormatted}</div>
                  <div className="text-2xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors mt-0.5">
                    {trip.villeDepart} → Le Bourget
                  </div>
                  <div className="text-xs text-slate-300 mt-1.5 flex items-center gap-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Départ {trip.heureDepart} · Arrivée visée ~{trip.heureArriveeEstimee} (Portes à 13h00)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>RDV : {trip.adresseDepart} (Arrêt : Gaillon)</span>
                  </div>
                </div>

                {trip.regles.ambianceTags && trip.regles.ambianceTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {trip.regles.ambianceTags.map((tag, idx) => (
                      <span key={idx} className="bg-white/[0.04] text-slate-300 text-[11px] px-2.5 py-0.5 rounded-lg border border-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs text-slate-400 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E4002B] to-red-800 text-white font-bold text-xs flex items-center justify-center">
                      {trip.conducteurNom[0]}
                    </div>
                    <div>
                      <span className="text-slate-200 font-semibold block">{trip.conducteurNom}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{trip.vehicule}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-mono text-xs font-semibold">★ {trip.conducteurNote} / 5</span>
                    <span className="text-slate-500 text-[10px] block">({trip.conducteurAvisCount} avis)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {trip.placesDisponibles} place(s) disponible(s)
                </span>
                <span className="text-xs font-bold text-red-400 group-hover:text-red-300 flex items-center gap-1">
                  Tester la réservation & débloquer le tél →
                </span>
              </div>
            </div>
          ))}

          {/* Carte 2 : Proposer un convoi depuis sa ville */}
          <div className="md:col-span-5 titanium-card rounded-2xl p-6 flex flex-col justify-between border-dashed border-white/20 space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-red-400">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-xl uppercase tracking-tight text-white">
                Tu as une voiture disponible ?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Sois le premier convoi depuis ta ville (Lille, Lyon, Nantes, Marseille, Bordeaux, Strasbourg...) ! Partage tes frais réels et aide tes camarades à rallier Le Bourget.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs text-slate-400 font-mono bg-[#070B16] p-3 rounded-xl border border-white/[0.06] space-y-1">
                <div>✓ Plafond solidaire strict : max 0,08 €/km</div>
                <div>✓ Téléphone protégé jusqu'à confirmation</div>
                <div>✓ Paiement direct de la main à la main</div>
              </div>

              <button
                onClick={() => setCurrentPage('publier')}
                className="w-full bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(228,0,43,0.3)] active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Proposer un trajet test</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLAN DES ITINÉRAIRES DEPUIS LES GRANDES VILLES (#plan-france) */}
      <section id="plan-france" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <PlanAccesFrance />
      </section>

      {/* 4. CALCULATEUR DE PRIX JUSTE (#calculateur-prix-juste) */}
      <section id="calculateur-prix-juste" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <CalculateurPrixJuste 
          onApplyPrice={(price, dist) => {
            setSearchCity('');
            setCurrentPage('recherche');
          }}
        />
      </section>

      {/* 5. AUTORADIO DU 7 NOVEMBRE : RØD — « L'AVENIR EN COMMUN » */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="titanium-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider flex items-center gap-1.5 font-semibold">
                <Radio className="w-4 h-4" />
                <span>La Sono de Route</span>
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                RØD — « L'AVENIR EN COMMUN »
              </h3>
              <p className="text-xs text-slate-400">
                L'hymne militant et rassembleur dans l'habitacle pour donner le tempo vers Le Bourget.
              </p>
            </div>

            <a
              href="https://www.youtube.com/results?search_query=R%C3%B8d+L%27avenir+en+commun"
              target="_blank"
              rel="noreferrer"
              className="bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition"
            >
              <span>Écouter sur YouTube</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/ysF7Tcw4HbY?rel=0&modestbranding=1"
                  title="Rød - L'Avenir en commun"
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
                  Composé par l'artiste Rød en écho au programme de transformation sociale et écologique « L'Avenir en commun », ce morceau fédérateur donne le rythme et l'élan pour converger vers la grande convention du Bourget.
                </p>
              </div>

              <div className="bg-[#070B16] p-4 rounded-xl border border-white/[0.06] space-y-1">
                <div className="text-slate-300 font-semibold">Lecteur flottant permanent</div>
                <div className="text-slate-500">
                  Le player reste disponible en bas à gauche de l'écran lors de toute ta navigation sur le site.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRIBUNE JURIDIQUE ET CONSTITUTIONNELLE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="titanium-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-400/20">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Protection Constitutionnelle & Liberté de Réunion</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white">
              « Se rassembler, écouter, débattre : le fondement d'une démocratie vivante. »
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quand le pouvoir tente de décourager l'expression citoyenne, la réponse réside dans la fraternité concrète et le rassemblement massif. Cap sur le Bourget facilite le transport partagé bénévole dans le respect rigoureux du Code des transports (Art. L. 3132-1).
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('pourquoi')}
            className="shrink-0 bg-white hover:bg-slate-100 text-neutral-950 px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition shadow-sm active:scale-95"
          >
            Lire la tribune juridique →
          </button>
        </div>
      </section>

    </div>
  );
};
