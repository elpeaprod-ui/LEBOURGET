import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Phone, Mail, Car, ShieldCheck, AlertCircle, 
  CheckCircle2, Star, Edit3, Lock, Award 
} from 'lucide-react';

export const ProfilView: React.FC = () => {
  const { currentUser, updateCurrentUser, refreshEmailVerified, resendVerification, userReviews, showToast } = useApp();

  const [prenom, setPrenom] = useState(currentUser.prenom);
  const [nom, setNom] = useState(currentUser.nom);
  const [telephone, setTelephone] = useState(currentUser.telephone);
  const [vehicule, setVehicule] = useState(currentUser.vehicule || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [villeResidence, setVilleResidence] = useState(currentUser.villeResidence || '');

  // Validation du numéro de téléphone
  const isPhoneValid = (tel: string) => {
    const cleaned = tel.replace(/[\s.-]/g, '');
    const regexFr = /^(?:(?:\+|00)33|0)[1-9]\d{8}$/;
    return regexFr.test(cleaned);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prenom.trim() || !nom.trim()) {
      showToast("Le prénom et le nom sont requis.", "warning");
      return;
    }

    if (!telephone.trim()) {
      showToast("Le numéro de téléphone est obligatoire.", "error");
      return;
    }

    if (!isPhoneValid(telephone)) {
      showToast("Format de téléphone invalide. Utilise un format français (ex: 06 12 34 56 78 ou +33 6...).", "error");
      return;
    }

    updateCurrentUser({
      prenom: prenom.trim(),
      nom: nom.trim(),
      telephone: telephone.trim(),
      vehicule: vehicule.trim(),
      bio: bio.trim(),
      villeResidence: villeResidence.trim()
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-28 space-y-6 text-slate-100">
      
      {/* En-tête Apple Style */}
      <div className="titanium-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E4002B] to-red-800 text-white font-heading font-black text-2xl flex items-center justify-center shadow-lg border border-white/20">
            {currentUser.prenom[0]}
          </div>
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white leading-none">
              {currentUser.prenom} {currentUser.nom}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 text-xs font-mono">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                currentUser.emailVerified
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  : 'bg-red-950/80 text-red-300 border border-red-500/30'
              }`}>
                {currentUser.emailVerified ? '✓ Email vérifié' : '⚠️ Email non vérifié'}
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                ★ {currentUser.note} ({currentUser.avisCount} avis)
              </span>
            </div>
          </div>
        </div>

        {!currentUser.emailVerified && (
          <div className="flex flex-col sm:items-end gap-1.5">
            <button
              onClick={refreshEmailVerified}
              className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 px-3.5 py-1.5 rounded-xl uppercase font-semibold transition"
            >
              J'ai cliqué sur le lien
            </button>
            <button
              onClick={resendVerification}
              className="text-[11px] underline underline-offset-2 text-slate-400 hover:text-white"
            >
              Renvoyer l'email de confirmation
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Colonne Formulaire (2/3) */}
        <div className="md:col-span-2 titanium-card rounded-2xl p-6 space-y-6">
          <h2 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.08] pb-2">
            Modifier mes informations
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">Prénom *</label>
                <input
                  type="text"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">Nom ou initiale *</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Adresse email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400 cursor-not-allowed"
                />
                <span className={`inline-flex items-center px-3 rounded-xl text-xs font-mono ${
                  currentUser.emailVerified ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/70 text-red-300 border border-red-500/30'
                }`}>
                  {currentUser.emailVerified ? 'Vérifié' : 'En attente'}
                </span>
              </div>
            </div>

            {/* NUMÉRO DE TÉLÉPHONE OBLIGATOIRE ET PROTÉGÉ */}
            <div className="p-4 bg-[#070B16] rounded-xl border border-white/[0.08] space-y-2">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Numéro de téléphone obligatoire * (Confidentiel)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  placeholder="06 12 34 56 78 ou +33 6 12 34 56 78"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 text-xs bg-[#0A0F1D] text-white font-mono focus:border-red-500 focus:outline-none transition"
                />
              </div>
              <div className="flex items-start gap-1.5 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Protection de la vie privée :</strong> Ton numéro n'est jamais public. Il ne sera débloqué qu'entre toi et l'autre membre une fois la réservation confirmée.
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Ville de résidence
              </label>
              <input
                type="text"
                placeholder="Ex: Lille, Lyon 7e, Rouen..."
                value={villeResidence}
                onChange={(e) => setVilleResidence(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Véhicule habituel (si tu conduis)
              </label>
              <input
                type="text"
                placeholder="Ex: Peugeot 208 blanche, Dacia Sandero..."
                value={vehicule}
                onChange={(e) => setVehicule(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                Bio citoyenne & Présentation
              </label>
              <textarea
                rows={3}
                placeholder="Quelques mots sur toi, ton engagement ou tes habitudes de covoiturage..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(228,0,43,0.3)] active:scale-95"
              >
                Enregistrer mon profil
              </button>
            </div>
          </form>
        </div>

        {/* Colonne Avis & Charte (1/3) */}
        <div className="space-y-6">
          
          {/* Avis reçus */}
          <div className="titanium-card rounded-2xl p-5 space-y-4">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white border-b border-white/[0.08] pb-2">
              Avis Reçus ({userReviews.length})
            </h3>

            <div className="space-y-2.5">
              {userReviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-[#070B16] rounded-xl border border-white/[0.06] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-white">{rev.auteurNom}</strong>
                    <span className="text-amber-400 font-mono">★ {rev.note}/5</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    « {rev.commentaire} »
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">{rev.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rappel des engagements */}
          <div className="titanium-card rounded-2xl p-5 space-y-2 border border-white/10">
            <h4 className="font-heading font-bold text-base uppercase text-white">
              Engagement Citoyen
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              En covoiturant pour le 7 novembre, chaque participant s'engage à la courtoisie, au respect mutuel des horaires et au strict partage de frais sans intérêt lucratif.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
