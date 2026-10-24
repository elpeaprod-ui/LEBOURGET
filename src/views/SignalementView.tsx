import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const SignalementView: React.FC = () => {
  const { trips, selectedTripId, submitReport, setCurrentPage } = useApp();

  const [motif, setMotif] = useState<'prix_excessif' | 'spam' | 'propos_inappropries' | 'faux_profil' | 'securite'>('prix_excessif');
  const [details, setDetails] = useState('');
  const [selectedTarget, setSelectedTarget] = useState<string>(selectedTripId || (trips[0] ? trips[0].id : ''));
  const [submitted, setSubmitted] = useState(false);

  const targetTrip = trips.find((t) => t.id === selectedTarget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    submitReport({
      type: 'trajet',
      cibleId: selectedTarget,
      cibleNom: targetTrip ? `${targetTrip.villeDepart} (${targetTrip.conducteurNom})` : 'Annonce générale',
      motif,
      details: details.trim()
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4 text-slate-100">
        <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center rounded-2xl shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-black text-3xl uppercase text-white tracking-tight">
          Signalement Bien Reçu
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Merci pour ta vigilance citoyenne. Notre équipe bénévole de modération examine cette annonce afin de garantir le respect strict des règles de non-profit et de fraternité.
        </p>
        <button
          onClick={() => setCurrentPage('accueil')}
          className="bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 pb-28 space-y-6 text-slate-100">
      <button
        onClick={() => setCurrentPage('accueil')}
        className="text-xs font-semibold uppercase text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Annuler et retourner</span>
      </button>

      <div className="titanium-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-red-400 font-mono text-xs uppercase font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Modération Citoyenne</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white tracking-tight">
            Signaler un Abus ou une Annonce
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aide-nous à préserver une plateforme saine, bienveillante et strictement sans spéculation financière.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
              Trajet ou convoi concerné
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0A0F1D]">
                  {t.villeDepart} → Le Bourget ({t.conducteurNom} - {t.prixParPlace} €)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
              Motif principal du signalement *
            </label>
            <select
              value={motif}
              onChange={(e) => setMotif(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            >
              <option value="prix_excessif" className="bg-[#0A0F1D]">Prix supérieur au plafond de partage légal des frais</option>
              <option value="spam" className="bg-[#0A0F1D]">Spam / Démarchage commercial ou publicitaire</option>
              <option value="propos_inappropries" className="bg-[#0A0F1D]">Propos injurieux, haineux ou inappropriés</option>
              <option value="faux_profil" className="bg-[#0A0F1D]">Faux profil, fausses coordonnées ou numéro erroné</option>
              <option value="securite" className="bg-[#0A0F1D]">Problème de sécurité ou véhicule non conforme</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
              Explications pour la modération *
            </label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Décris précisément ce que tu as constaté (messages suspects, demande de surcoût, etc.)..."
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 text-xs bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
            />
          </div>

          <div className="p-3 bg-[#070B16] rounded-xl border border-white/[0.06] text-xs text-slate-500 font-mono">
            Les signalements abusifs ou malveillants font également l'objet d'un examen par les modérateurs.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('accueil')}
              className="px-4 py-2 border border-white/10 text-xs font-semibold uppercase text-slate-400 hover:text-white rounded-xl transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-5 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition shadow active:scale-95"
            >
              Transmettre le signalement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
