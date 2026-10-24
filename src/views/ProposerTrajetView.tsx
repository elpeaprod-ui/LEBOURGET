import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EVENT_CONFIG } from '../config/event.config';
import { estimateDistance, calculateMaxPrice } from '../utils/distance';
import { TripType } from '../types';
import { 
  Car, Clock, Calendar, MapPin, AlertCircle, Info, 
  CheckCircle2, PlusCircle, ShieldAlert, Navigation, 
  Coffee, Music, Flag, Sparkles, Calculator, ArrowRight 
} from 'lucide-react';
import { CalculateurPrixJuste } from '../components/CalculateurPrixJuste';

export const ProposerTrajetView: React.FC = () => {
  const { currentUser, addTrip, setCurrentPage, setSelectedTripId, showToast, toggleEmailVerified } = useApp();

  const [villeDepart, setVilleDepart] = useState('');
  const [adresseDepart, setAdresseDepart] = useState('');
  const [typeTrajet, setTypeTrajet] = useState<TripType>('aller-retour');
  const [dateDepart, setDateDepart] = useState('2026-11-07');
  const [heureDepart, setHeureDepart] = useState('10:00');
  const [dateRetour, setDateRetour] = useState('2026-11-07');
  const [heureRetour, setHeureRetour] = useState('19:30');
  const [places, setPlaces] = useState(3);
  const [distanceKm, setDistanceKm] = useState(180);
  const [prixParPlace, setPrixParPlace] = useState(12);
  const [vehicule, setVehicule] = useState(currentUser.vehicule || 'Renault Clio IV');
  const [etapes, setEtapes] = useState('');
  const [bagages, setBagages] = useState<'Petits sacs uniquement' | 'Sacs à dos & valises cabine' | 'Grands bagages acceptés'>('Sacs à dos & valises cabine');
  const [nonFumeur, setNonFumeur] = useState(true);
  const [pmr, setPmr] = useState(false);
  const [animaux, setAnimaux] = useState(false);
  const [musique, setMusique] = useState(true);
  
  // Options d'ambiance
  const [hasCoffee, setHasCoffee] = useState(true);
  const [hasPlaylist, setHasPlaylist] = useState(true);
  const [hasBakeryStop, setHasBakeryStop] = useState(false);
  const [hasFlagSpace, setHasFlagSpace] = useState(true);

  const [description, setDescription] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  // Mettre à jour automatiquement la distance quand l'utilisateur tape une ville
  useEffect(() => {
    if (villeDepart.trim()) {
      const estimated = estimateDistance(villeDepart);
      setDistanceKm(estimated);
      const cap = calculateMaxPrice(estimated);
      setPrixParPlace(Math.min(cap, Math.max(5, Math.round(estimated * 0.06))));
    }
  }, [villeDepart]);

  const prixMaxAutorise = calculateMaxPrice(distanceKm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser.emailVerified) {
      showToast("Vérification obligatoire de ton adresse email par lien avant de publier.", "error");
      return;
    }

    if (!villeDepart.trim() || !adresseDepart.trim()) {
      showToast("Merci d'indiquer la ville et l'adresse de rendez-vous.", "warning");
      return;
    }

    if (prixParPlace > prixMaxAutorise) {
      showToast(`Le prix ne peut excéder le plafond légal de ${prixMaxAutorise} € pour cette distance (${distanceKm} km).`, "error");
      return;
    }

    const etapesArray = etapes
      ? etapes.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const ambianceTags: string[] = [];
    if (hasCoffee) ambianceTags.push("☕ Café thermos");
    if (hasPlaylist) ambianceTags.push("📻 Playlist & Débats");
    if (hasBakeryStop) ambianceTags.push("🥐 Pause croissants");
    if (hasFlagSpace) ambianceTags.push("🚩 Banderoles ok");

    const newTrip = addTrip({
      villeDepart: villeDepart.trim(),
      adresseDepart: adresseDepart.trim(),
      destination: `${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.address}, ${EVENT_CONFIG.venue.postalCode} ${EVENT_CONFIG.venue.city}`,
      dateDepart,
      heureDepart: heureDepart.replace(':', 'h'),
      heureArriveeEstimee: "12h45",
      typeTrajet,
      dateRetour: typeTrajet === 'aller-retour' ? dateRetour : undefined,
      heureRetour: typeTrajet === 'aller-retour' ? heureRetour.replace(':', 'h') : undefined,
      placesTotal: Number(places),
      placesDisponibles: Number(places),
      prixParPlace: Number(prixParPlace),
      distanceKm: Number(distanceKm),
      vehicule: vehicule.trim(),
      etapesIntermediaires: etapesArray,
      description: description.trim() || "En route ensemble pour le Bourget le 7 novembre !",
      regles: {
        bagages,
        nonFumeur,
        animaux,
        pmr,
        musiqueOuPodcast: musique,
        ambianceTags
      }
    });

    setSelectedTripId(newTrip.id);
    setCurrentPage('detail');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-28 space-y-6 text-slate-100">
      
      {/* En-tête Titanium Apple Style */}
      <div className="titanium-card rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Solidarité Populaire · Zéro Commission
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
          Proposer un Trajet en Véhicule
        </h1>
        <p className="text-xs text-slate-400">
          Partage tes places libres, mutualise les frais réels et voyage dans un esprit de fraternité et d'engagement citoyen.
        </p>
      </div>

      {/* AVERTISSEMENT EMAIL */}
      {!currentUser.emailVerified && (
        <div className="bg-red-950/60 border border-red-500/40 p-4 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Validation d'email requise :</strong>
              <p className="text-slate-300 mt-0.5">
                Pour garantir la sécurité et la bonne foi des réservations, ton email ({currentUser.email}) doit être confirmé.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleEmailVerified}
            className="shrink-0 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 text-xs font-semibold uppercase rounded-lg transition"
          >
            Valider mon email (test)
          </button>
        </div>
      )}

      {/* RAPPEL HORAIRE IMPORTANT (13H) */}
      <div className="bg-[#080C18] border border-amber-400/30 p-4 rounded-xl text-xs text-slate-300 leading-relaxed space-y-1">
        <strong className="block text-amber-300 uppercase font-mono text-[10px] flex items-center gap-1.5">
          <span>⏰</span> Recommandation horaire stratégique :
        </strong>
        <p>
          Le rassemblement commence à 15h00. Choisissez une heure de départ pour <strong>arriver vers l'ouverture des portes (~13h00)</strong> au Bourget afin de vous garer et entrer sereinement.
        </p>
      </div>

      {/* FORMULAIRE PRINCIPAL */}
      <div className="titanium-card rounded-2xl p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1 : Itinéraire */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.08] pb-2">
              1. Ville de départ & Rendez-vous
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Ville de départ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rouen, Lille, Nantes, Lyon..."
                  value={villeDepart}
                  onChange={(e) => setVilleDepart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Lieu précis de rendez-vous *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gare SNCF, sortie de métro, parking relais..."
                  value={adresseDepart}
                  onChange={(e) => setAdresseDepart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Destination finale
              </label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-red-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  disabled
                  value={`${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.address}, ${EVENT_CONFIG.venue.postalCode} ${EVENT_CONFIG.venue.city}`}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs text-slate-300 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Étapes intermédiaires ou arrêts autorisés (séparer par des virgules)
              </label>
              <input
                type="text"
                placeholder="Ex: Péage Arras, Compiègne centre..."
                value={etapes}
                onChange={(e) => setEtapes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Section 2 : Date, Formule & Horaires */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.08] pb-2">
              2. Formule & Horaires
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Formule de trajet
                </label>
                <select
                  value={typeTrajet}
                  onChange={(e) => setTypeTrajet(e.target.value as TripType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
                >
                  <option value="aller-retour" className="bg-[#0A0F1D]">Aller-retour</option>
                  <option value="aller-simple" className="bg-[#0A0F1D]">Aller simple vers Le Bourget</option>
                  <option value="retour-simple" className="bg-[#0A0F1D]">Retour simple depuis Le Bourget</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Date de départ
                </label>
                <select
                  value={dateDepart}
                  onChange={(e) => setDateDepart(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-medium focus:border-red-500 focus:outline-none transition"
                >
                  <option value="2026-11-07" className="bg-[#0A0F1D]">Samedi 7 novembre (Jour J)</option>
                  <option value="2026-11-06" className="bg-[#0A0F1D]">Vendredi 6 novembre (Veille)</option>
                  <option value="2026-11-08" className="bg-[#0A0F1D]">Dimanche 8 novembre</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Heure de départ (viser ~13h)
                </label>
                <input
                  type="time"
                  value={heureDepart}
                  onChange={(e) => setHeureDepart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white font-mono focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            {typeTrajet === 'aller-retour' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#070B16] rounded-xl border border-white/[0.06]">
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    Date du retour
                  </label>
                  <select
                    value={dateRetour}
                    onChange={(e) => setDateRetour(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-xs bg-[#0A0F1D] text-white font-medium focus:border-red-500 focus:outline-none transition"
                  >
                    <option value="2026-11-07" className="bg-[#0A0F1D]">Samedi 7 novembre (après le meeting)</option>
                    <option value="2026-11-08" className="bg-[#0A0F1D]">Dimanche 8 novembre (lendemain)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                    Heure estimée de retour
                  </label>
                  <input
                    type="time"
                    value={heureRetour}
                    onChange={(e) => setHeureRetour(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#0A0F1D] text-white font-mono focus:border-red-500 focus:outline-none transition"
                  />
                  <span className="text-[10px] text-slate-500 font-mono">
                    Départ conseillé vers 19h30 - 20h00 pour profiter de l'événement.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3 : Plafonnement légal des frais au km */}
          <div className="p-5 sm:p-6 bg-[#070B16] rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white">
                3. Partage des Frais Réels (Zéro Profit)
              </h3>
              <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded font-bold">
                Code des transports L. 3132-1
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Distance estimée (km)
                </label>
                <input
                  type="number"
                  min="5"
                  max="1200"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#0A0F1D] text-white font-mono focus:border-red-500 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Nombre de places disponibles
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={places}
                  onChange={(e) => setPlaces(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#0A0F1D] text-white font-mono focus:border-red-500 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold flex items-center justify-between">
                  <span>Tarif par place (€)</span>
                  <span className="text-red-400 font-mono text-xs font-bold">Max : {prixMaxAutorise} €</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max={prixMaxAutorise}
                  value={prixParPlace}
                  onChange={(e) => setPrixParPlace(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-red-500/40 text-xs bg-[#0A0F1D] text-white font-mono font-bold focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowCalculator(!showCalculator)}
                className="text-xs font-mono uppercase text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
              >
                <Calculator className="w-4 h-4" />
                <span>{showCalculator ? "Masquer le calculateur" : "Ouvrir le calculateur précis (essence + péage)"}</span>
              </button>

              {showCalculator && (
                <div className="mt-4 pt-4 border-t border-white/[0.08]">
                  <CalculateurPrixJuste
                    initialDistance={distanceKm}
                    initialCity={villeDepart || 'Lille'}
                    onApplyPrice={(computedPrice, computedDistance) => {
                      setPrixParPlace(computedPrice);
                      setDistanceKm(computedDistance);
                      setShowCalculator(false);
                      showToast(`Tarif appliqué : ${computedPrice} € par passager pour ${computedDistance} km.`, "success");
                    }}
                  />
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400 bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06] space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span>Plafond strict de solidarité pour {distanceKm} km :</span>
                <strong className="text-red-400 font-bold">{prixMaxAutorise} € max par place</strong>
              </div>
              <p className="text-[11px] text-slate-500">
                Conformément à l'Art. L. 3132-1 du Code des transports, le covoiturage exclut tout profit. Les frais réels sont partagés en main propre.
              </p>
            </div>
          </div>

          {/* Section 4 : Véhicule, Confort & Ambiance */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.08] pb-2">
              4. Ambiance & Confort à bord
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Modèle & couleur du véhicule
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Peugeot 208 blanche, Dacia Duster gris..."
                  value={vehicule}
                  onChange={(e) => setVehicule(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Taille des bagages acceptés
                </label>
                <select
                  value={bagages}
                  onChange={(e) => setBagages(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
                >
                  <option value="Sacs à dos & valises cabine" className="bg-[#0A0F1D]">Sacs à dos & valises cabine</option>
                  <option value="Petits sacs uniquement" className="bg-[#0A0F1D]">Petits sacs uniquement</option>
                  <option value="Grands bagages acceptés" className="bg-[#0A0F1D]">Grands bagages acceptés (grand coffre)</option>
                </select>
              </div>
            </div>

            {/* Badges d'ambiance interactive */}
            <div className="space-y-2 pt-2">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Ambiance de ton convoi :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setHasCoffee(!hasCoffee)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center gap-2 ${
                    hasCoffee ? 'bg-amber-950/70 border-amber-400/60 text-amber-300' : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Thermos de café</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasPlaylist(!hasPlaylist)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center gap-2 ${
                    hasPlaylist ? 'bg-red-950/70 border-red-400/60 text-red-300' : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  <Music className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Playlist & Débats</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasBakeryStop(!hasBakeryStop)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center gap-2 ${
                    hasBakeryStop ? 'bg-amber-950/70 border-amber-400/60 text-amber-300' : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Pause croissants</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasFlagSpace(!hasFlagSpace)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center gap-2 ${
                    hasFlagSpace ? 'bg-blue-950/70 border-blue-400/60 text-blue-300' : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  <Flag className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Banderoles ok</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap text-xs text-slate-300 pt-2 font-mono">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nonFumeur}
                  onChange={(e) => setNonFumeur(e.target.checked)}
                  className="w-4 h-4 accent-[#E4002B]"
                />
                <span>Non-fumeur</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pmr}
                  onChange={(e) => setPmr(e.target.checked)}
                  className="w-4 h-4 accent-[#E4002B]"
                />
                <span>Adapté PMR</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={animaux}
                  onChange={(e) => setAnimaux(e.target.checked)}
                  className="w-4 h-4 accent-[#E4002B]"
                />
                <span>Animaux acceptés</span>
              </label>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Mot d'accueil & précisions pour les passagers
              </label>
              <textarea
                rows={3}
                placeholder="Ex: On s'arrête faire une pause café sur l'autoroute, thermos chaud et bonne humeur bienvenus !"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="pt-6 border-t border-white/[0.08] flex justify-end gap-3 items-center">
            <button
              type="button"
              onClick={() => setCurrentPage('accueil')}
              className="px-4 py-2.5 border border-white/10 text-xs font-semibold uppercase text-slate-400 hover:text-white rounded-xl transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!currentUser.emailVerified}
              className={`px-7 py-3 font-heading font-bold text-xs uppercase tracking-wider text-white rounded-xl transition shadow-[0_0_20px_rgba(228,0,43,0.4)] ${
                currentUser.emailVerified
                  ? 'bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] active:scale-95'
                  : 'bg-neutral-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Mettre en ligne mon équipage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
