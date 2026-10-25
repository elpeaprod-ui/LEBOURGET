import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EVENT_CONFIG } from '../config/event.config';
import { 
  Car, MessageSquare, Phone, CheckCircle, XCircle, 
  Trash2, AlertTriangle, Clock, MapPin, User, PlusCircle, ArrowRight 
} from 'lucide-react';

export const MesTrajetsView: React.FC = () => {
  const { 
    currentUser, 
    trips, 
    bookings, 
    cancelBooking, 
    updateBookingStatus, 
    deleteTrip,
    setCurrentPage, 
    setSelectedTripId, 
    startOrOpenConversation 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reserves' | 'proposes'>('reserves');

  // Trajets où je suis passager
  const myBookings = bookings.filter((b) => b.passagerId === currentUser.id);

  // Trajets où je suis conducteur
  const myPublishedTrips = trips.filter((t) => t.conducteurId === currentUser.id);

  // Demandes de passagers reçues sur mes trajets
  const incomingRequests = bookings.filter((b) => {
    const trip = trips.find((t) => t.id === b.trajetId);
    return trip && trip.conducteurId === currentUser.id;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-28 space-y-6 text-slate-100">
      
      {/* En-tête Apple Style */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
            Gestion Citoyenne
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-0.5">
            Mes Trajets pour le 7 Novembre
          </h1>
          <p className="text-xs text-slate-400">
            Suis tes réservations en tant que passager et tes convois proposés en tant que conducteur.
          </p>
        </div>

        {/* Switch d'onglets Apple-style */}
        <div className="flex p-1 bg-[#070B16] border border-white/10 rounded-xl">
          <button
            onClick={() => setActiveTab('reserves')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'reserves'
                ? 'bg-[#E4002B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mes réservations ({myBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('proposes')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'proposes'
                ? 'bg-[#E4002B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mes annonces ({myPublishedTrips.length})
          </button>
        </div>
      </div>

      {/* ONGLET 1 : MES RÉSERVATIONS EN TANT QUE PASSAGER */}
      {activeTab === 'reserves' && (
        <div className="space-y-3">
          {myBookings.length === 0 ? (
            <div className="titanium-card p-12 text-center rounded-2xl border-dashed border-white/10 space-y-4">
              <Car className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="font-heading font-extrabold text-xl uppercase text-white">
                Tu n'as aucune place réservée
              </h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                Trouve un équipage partant de ta région pour rejoindre la grande convention au Bourget le samedi 7 novembre.
              </p>
              <button
                onClick={() => setCurrentPage('recherche')}
                className="bg-gradient-to-r from-[#E4002B] to-[#C90026] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow"
              >
                Rechercher un covoiturage
              </button>
            </div>
          ) : (
            myBookings.map((b) => {
              const trip = trips.find((t) => t.id === b.trajetId);
              if (!trip) return null;

              const isConfirmed = b.statut === 'confirmee';

              return (
                <div
                  key={b.id}
                  className="titanium-card rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                          isConfirmed
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                            : b.statut === 'en_attente'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                            : 'bg-red-950/80 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {isConfirmed ? '✓ Place confirmée' : b.statut === 'en_attente' ? '⏳ En attente' : 'Refusée'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {trip.dateDepart === '2026-11-07' ? 'Samedi 7 nov' : trip.dateDepart}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-xl uppercase text-white">
                      {trip.villeDepart} → Le Bourget
                    </h3>

                    <div className="text-xs text-slate-400 flex items-center gap-3 flex-wrap font-mono">
                      <span>Départ : <strong className="text-slate-200">{trip.heureDepart}</strong></span>
                      <span>·</span>
                      <span>RDV : {trip.adresseDepart}</span>
                      <span>·</span>
                      <span>Conducteur : <strong className="text-slate-200">{trip.conducteurNom}</strong></span>
                    </div>

                    {/* Téléphone débloqué */}
                    {isConfirmed ? (
                      <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs text-emerald-300 font-mono">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Téléphone conducteur : <strong>{trip.conducteurTel}</strong></span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 font-mono">
                        🔒 Le téléphone sera révélé dès validation par le conducteur.
                      </div>
                    )}
                  </div>

                  {/* Actions passager */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.06]">
                    <button
                      onClick={() => {
                        setSelectedTripId(trip.id);
                        setCurrentPage('detail');
                      }}
                      className="text-xs font-semibold uppercase text-slate-300 hover:text-white px-3 py-1.5 border border-white/10 rounded-lg bg-white/[0.04] transition"
                    >
                      Détails
                    </button>

                    <button
                      onClick={() => {
                        startOrOpenConversation(trip.id, trip.conducteurId, trip.conducteurNom);
                        setCurrentPage('messagerie');
                      }}
                      className="bg-white/[0.06] hover:bg-white/[0.1] text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg border border-white/10 flex items-center gap-1.5 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Discuter</span>
                    </button>

                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="text-xs font-semibold uppercase text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg transition"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ONGLET 2 : MES ANNONCES EN TANT QUE CONDUCTEUR */}
      {activeTab === 'proposes' && (
        <div className="space-y-6">
          
          {/* Annonces publiées */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-lg uppercase text-white">
                Mes convois proposés ({myPublishedTrips.length})
              </h2>
              <button
                onClick={() => setCurrentPage('publier')}
                className="text-xs font-semibold uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Nouveau trajet</span>
              </button>
            </div>

            {myPublishedTrips.length === 0 ? (
              <div className="titanium-card p-8 text-center rounded-2xl border-white/10">
                <p className="text-slate-400 text-xs mb-3">Tu n'as publié aucun trajet pour l'instant.</p>
                <button
                  onClick={() => setCurrentPage('publier')}
                  className="bg-[#E4002B] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Proposer mon véhicule
                </button>
              </div>
            ) : (
              myPublishedTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="titanium-card rounded-2xl p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl uppercase text-white">
                        {trip.villeDepart} → Le Bourget
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Départ {trip.dateDepart} à {trip.heureDepart} · Véhicule : {trip.vehicule}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-heading font-black text-2xl text-white font-mono text-crimson-glow">
                          {trip.prixParPlace} €
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">par place</div>
                      </div>

                      <span
                        className={`text-xs font-mono px-2.5 py-0.5 rounded ${
                          trip.placesDisponibles > 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/70 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {trip.placesDisponibles} place(s) libre(s) / {trip.placesTotal}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">
                      RDV : <strong className="text-slate-200">{trip.adresseDepart}</strong>
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedTripId(trip.id);
                          setCurrentPage('detail');
                        }}
                        className="font-semibold uppercase text-slate-300 hover:text-white transition"
                      >
                        Voir la fiche →
                      </button>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="text-red-400 hover:text-red-300 font-semibold uppercase flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Demandes reçues de passagers */}
          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <h2 className="font-heading font-bold text-lg uppercase text-white">
              Demandes Reçues de Passagers ({incomingRequests.length})
            </h2>

            {incomingRequests.length === 0 ? (
              <div className="bg-[#070B16] p-6 text-center rounded-xl border border-white/[0.06] text-xs text-slate-500 font-mono">
                Aucune demande de passager pour le moment sur tes convois.
              </div>
            ) : (
              incomingRequests.map((req) => {
                const trip = trips.find((t) => t.id === req.trajetId);
                return (
                  <div
                    key={req.id}
                    className="titanium-card rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{req.passagerNom}</strong>
                        <span className="text-xs text-slate-400 font-mono">demande {req.places} place(s)</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                            req.statut === 'confirmee'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : req.statut === 'refusee'
                              ? 'bg-red-950/80 text-red-300 border border-red-500/30'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {req.statut}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Convoi : {trip ? `${trip.villeDepart} → Le Bourget` : 'Trajet'}
                      </div>
                      {req.messagePassager && (
                        <p className="text-xs text-slate-300 italic bg-white/[0.03] p-2 rounded-lg border border-white/[0.05] max-w-md">
                          « {req.messagePassager} »
                        </p>
                      )}
                      {req.statut === 'confirmee' && (
                        <div className="text-xs font-mono text-emerald-400">
                          Numéro du passager : {req.passagerTel}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {req.statut === 'en_attente' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(req.id, 'confirmee')}
                            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold uppercase rounded-lg flex items-center gap-1 transition"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Accepter</span>
                          </button>
                          <button
                            onClick={() => updateBookingStatus(req.id, 'refusee')}
                            className="border border-red-500/30 text-red-400 hover:bg-red-950/50 px-3 py-1.5 text-xs font-semibold uppercase rounded-lg flex items-center gap-1 transition"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Refuser</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
