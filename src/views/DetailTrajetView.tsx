import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EVENT_CONFIG } from '../config/event.config';
import { 
  MapPin, Clock, Calendar, Users, Phone, Lock, ShieldCheck, 
  Car, MessageSquare, AlertTriangle, CheckCircle, Info, ArrowLeft, 
  Share2, Heart, Award, Fuel, Coffee, Music, Flag, Sparkles, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DetailTrajetView: React.FC = () => {
  const { 
    trips, 
    selectedTripId, 
    setCurrentPage, 
    currentUser, 
    bookings, 
    createBooking, 
    startOrOpenConversation,
    showToast 
  } = useApp();

  const [requestedSeats, setRequestedSeats] = useState(1);
  const [passengerNote, setPassengerNote] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const trip = trips.find((t) => t.id === selectedTripId);

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 text-slate-100">
        <h2 className="font-heading font-extrabold text-2xl uppercase text-white">Trajet introuvable</h2>
        <p className="text-slate-400 text-xs">Ce covoiturage n'existe plus ou a été retiré.</p>
        <button
          onClick={() => setCurrentPage('recherche')}
          className="bg-[#E4002B] text-white px-5 py-2 text-xs font-bold uppercase rounded-xl"
        >
          Retour aux trajets
        </button>
      </div>
    );
  }

  // Vérifier si l'utilisateur actuel a déjà une réservation confirmée
  const myBooking = bookings.find(
    (b) => b.trajetId === trip.id && b.passagerId === currentUser.id && b.statut !== 'annulee'
  );
  const isDriver = trip.conducteurId === currentUser.id;
  const isPhoneUnlocked = (myBooking && myBooking.statut === 'confirmee') || isDriver;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = createBooking(trip.id, requestedSeats, passengerNote);
    if (success) {
      setShowBookingModal(false);
    }
  };

  const handleContactDriver = () => {
    startOrOpenConversation(trip.id, trip.conducteurId, trip.conducteurNom);
    setCurrentPage('messagerie');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Lien du trajet copié dans le presse-papier !", "info");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-28 space-y-6 text-slate-100">
      
      {/* Bouton retour & Partage */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('recherche')}
          className="text-xs font-semibold uppercase text-slate-400 hover:text-white flex items-center gap-1.5 transition bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour aux trajets</span>
        </button>

        <button
          onClick={handleShare}
          className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-1.5 rounded-xl border border-white/10 transition"
        >
          <Share2 className="w-3.5 h-3.5 text-red-400" />
          <span>Partager ce trajet</span>
        </button>
      </div>

      {/* CARTE PRINCIPALE TITANIUM DU TRAJET */}
      <div className="titanium-card rounded-2xl p-6 sm:p-10 space-y-8">
        
        {/* Titre & Prix */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-slate-300 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded">
                {trip.typeTrajet === 'aller-retour' ? 'Aller - Retour' : 'Aller simple'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {trip.dateDepart === '2026-11-07' ? 'Samedi 7 novembre 2026' : trip.dateDepart}
              </span>
            </div>
            
            <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight">
              {trip.villeDepart} → Le Bourget
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Départ {trip.heureDepart} · Arrivée visée ~{trip.heureArriveeEstimee} (Portes dès 13h00)
            </p>
          </div>

          <div className="text-left sm:text-right bg-[#070B16] sm:bg-transparent p-4 sm:p-0 rounded-xl w-full sm:w-auto border sm:border-0 border-white/[0.06]">
            <div className="font-heading font-black text-4xl sm:text-6xl text-white font-mono text-crimson-glow leading-none">
              {trip.prixParPlace} €
            </div>
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1">
              par passager (partage réel)
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Distance : {trip.distanceKm} km · Zéro profit
            </div>
          </div>
        </div>

        {/* Détails du parcours & Horaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Colonne Itinéraire */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.06] pb-2">
              Itinéraire & Rendez-vous
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-red-950/70 border border-red-500/30 text-red-400 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Point de rendez-vous</div>
                  <strong className="text-white block text-sm font-semibold">{trip.villeDepart}</strong>
                  <span className="text-xs text-slate-400">{trip.adresseDepart}</span>
                </div>
              </div>

              {trip.etapesIntermediaires && trip.etapesIntermediaires.length > 0 && (
                <div className="flex items-start gap-3 pl-3 border-l border-red-500/40 ml-4 py-1">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Étapes & arrêts :</span>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">
                      {trip.etapesIntermediaires.join(' · ')}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-950/70 border border-blue-500/30 text-blue-400 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Arrivée au Rassemblement</div>
                  <strong className="text-white block text-sm font-semibold">{EVENT_CONFIG.venue.name}</strong>
                  <span className="text-xs text-slate-400">
                    {EVENT_CONFIG.venue.address}, {EVENT_CONFIG.venue.postalCode} {EVENT_CONFIG.venue.city}
                  </span>
                </div>
              </div>

              {trip.typeTrajet === 'aller-retour' && (
                <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                  <div className="p-2.5 bg-amber-950/70 border border-amber-500/30 text-amber-400 rounded-xl shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Retour estimé</div>
                    <strong className="text-white block text-sm font-mono">
                      Vers {trip.heureRetour || '19h30'}
                    </strong>
                    <span className="text-xs text-slate-500">
                      Après les prises de parole du meeting
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Encadré organisation 13h */}
            <div className="bg-[#070B16] border border-amber-400/30 p-4 rounded-xl text-xs text-slate-300 space-y-1">
              <strong className="block text-amber-300 uppercase font-mono text-[10px]">
                Recommandation horaire :
              </strong>
              <p className="leading-relaxed">
                {EVENT_CONFIG.disclaimer.doorsAdvice}
              </p>
            </div>
          </div>

          {/* Colonne Conducteur, Véhicule & Ambiance */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.06] pb-2">
              Le Conducteur & Véhicule
            </h3>

            <div className="bg-[#070B16] p-5 rounded-xl border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-base">{trip.conducteurNom}</div>
                  <div className="text-xs text-amber-400 font-mono flex items-center gap-1 mt-0.5">
                    <span>★ {trip.conducteurNote} / 5</span>
                    <span className="text-slate-500">({trip.conducteurAvisCount} avis)</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E4002B] to-red-800 text-white font-heading font-bold text-lg flex items-center justify-center">
                  {trip.conducteurNom[0]}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic bg-white/[0.03] p-3 rounded-lg border border-white/[0.05]">
                « {trip.conducteurBio} »
              </p>

              {/* Ambiance à bord */}
              {trip.regles.ambianceTags && trip.regles.ambianceTags.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Ambiance annoncée :</span>
                  <div className="flex flex-wrap gap-1">
                    {trip.regles.ambianceTags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-medium bg-white/[0.05] text-slate-300 px-2.5 py-0.5 rounded border border-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 text-xs text-slate-400 space-y-1.5 border-t border-white/[0.06] font-mono">
                <div><strong className="text-slate-200">Véhicule :</strong> {trip.vehicule}</div>
                <div><strong className="text-slate-200">Bagages :</strong> {trip.regles.bagages}</div>
                <div className="flex items-center gap-3">
                  <span>{trip.regles.nonFumeur ? '🚭 Non-fumeur' : 'Fumeur toléré'}</span>
                  <span>{trip.regles.pmr ? '♿ Adapté PMR' : ''}</span>
                </div>
              </div>

              {/* TÉLÉPHONE MASQUÉ / DÉBLOQUÉ SELON STATUT */}
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                {isPhoneUnlocked ? (
                  <div className="bg-emerald-950/70 border border-emerald-500/40 p-3.5 rounded-xl text-emerald-200 text-xs flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-mono uppercase text-[10px] text-emerald-400 font-bold">
                        Numéro de téléphone déverrouillé :
                      </div>
                      <div className="text-base font-black font-mono mt-0.5 text-white">
                        {trip.conducteurTel}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Accessible car ta réservation est confirmée.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl text-slate-300 text-xs flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                    <div>
                      <strong className="block text-[11px] font-mono uppercase text-slate-400">
                        Téléphone privé (Protection de la vie privée)
                      </strong>
                      <span className="text-[11px] text-slate-500">
                        Débloqué immédiatement après confirmation de la réservation.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mot du conducteur */}
        <div className="bg-[#070B16] p-5 rounded-xl border border-white/[0.08] space-y-1">
          <h4 className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
            Précisions et message du conducteur
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {trip.description}
          </p>
        </div>

        {/* Encadré financier non-profit */}
        <div className="bg-[#070B16] p-4 rounded-xl border border-white/[0.06] text-xs text-slate-400 flex items-start gap-3">
          <Fuel className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="text-slate-200">Participation solidaire aux frais réels :</strong>
            <p>
              Le montant de {trip.prixParPlace} € correspond strictement au partage des coûts d'essence et de péage pour {trip.distanceKm} km. Aucun profit n'est réalisé conformément à la législation sur le covoiturage solidaire.
            </p>
          </div>
        </div>

        {/* Barre d'action basse */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage('signalement')}
            className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1.5 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Signaler cette annonce ou ce profil</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleContactDriver}
              className="w-full sm:w-auto bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contacter le conducteur</span>
            </button>

            {myBooking ? (
              <div className="w-full sm:w-auto bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 rounded-xl">
                <CheckCircle className="w-4 h-4" />
                <span>Place réservée ({myBooking.places} place)</span>
              </div>
            ) : isDriver ? (
              <div className="text-xs font-mono text-slate-400 uppercase px-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl">
                Tu es le conducteur de ce trajet
              </div>
            ) : trip.placesDisponibles <= 0 ? (
              <div className="text-xs font-mono text-red-400 uppercase px-4 py-2 bg-red-950/40 border border-red-500/30 rounded-xl">
                Ce convoi est complet
              </div>
            ) : (
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-7 py-2.5 font-heading font-bold text-sm uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(228,0,43,0.4)] active:scale-95 border border-red-500/30"
              >
                Réserver ma place ({trip.placesDisponibles} dispo)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODALE DE RÉSERVATION DE PLACE STYLE APPLE */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="titanium-card rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-start border-b border-white/[0.08] pb-3">
                <div>
                  <h3 className="font-heading font-black text-2xl uppercase text-white tracking-tight">
                    Rejoindre l'Équipage
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {trip.villeDepart} → Le Bourget ({trip.heureDepart})
                  </p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {!currentUser.emailVerified && (
                <div className="bg-red-950/60 border border-red-500/40 p-3 rounded-xl text-xs text-red-200 space-y-1">
                  <strong>Vérification d'email requise :</strong>
                  <p>
                    Pour garantir la sécurité et la bonne foi des réservations, ton adresse email ({currentUser.email}) doit être confirmée.
                  </p>
                </div>
              )}

              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    Nombre de places souhaitées
                  </label>
                  <select
                    value={requestedSeats}
                    onChange={(e) => setRequestedSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-mono focus:border-red-500 focus:outline-none transition"
                  >
                    {Array.from({ length: trip.placesDisponibles }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-[#0A0F1D]">
                        {n} place{n > 1 ? 's' : ''} ({n * trip.prixParPlace} € au total)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    Message pour le conducteur (optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={passengerNote}
                    onChange={(e) => setPassengerNote(e.target.value)}
                    placeholder="Ex: Salut ! Je serai au rendez-vous à l'heure avec mon sac et toute mon énergie..."
                    className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
                  />
                </div>

                <div className="p-3 bg-[#070B16] rounded-xl border border-white/[0.06] text-xs text-slate-400 space-y-1 font-mono">
                  <div><strong>Partage des frais :</strong> {requestedSeats * trip.prixParPlace} € réglés en main propre.</div>
                  <div><strong>Téléphone :</strong> Coordonnées déverrouillées dès validation mutuelle.</div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 border border-white/10 text-xs font-semibold uppercase text-slate-400 hover:text-white rounded-xl"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#E4002B] to-[#C90026] text-white px-5 py-2 font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow active:scale-95"
                  >
                    Confirmer la réservation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
