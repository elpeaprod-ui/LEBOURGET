import React from 'react';
import { useApp } from '../context/AppContext';
import { EVENT_CONFIG } from '../config/event.config';
import { ShieldCheck, Scale, FileText, Lock, Users, ArrowLeft } from 'lucide-react';

export const MentionsEtReglesView: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pb-28 space-y-8 text-slate-100">
      <button
        onClick={() => setCurrentPage('accueil')}
        className="text-xs font-semibold uppercase text-slate-400 hover:text-white flex items-center gap-1.5 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Retour à l'accueil</span>
      </button>

      <div className="titanium-card rounded-2xl p-6 sm:p-10 space-y-8">
        <div className="border-b border-white/[0.08] pb-4">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
            Cadre Réglementaire & Déontologique
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
            Charte Citoyenne, CGU & Confidentialité
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Règles d'usage et garanties de la plateforme bénévole « Cap sur le Bourget ».
          </p>
        </div>

        {/* Section 1 : Statut indépendant */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl uppercase">
            <Scale className="w-5 h-5 text-red-500" />
            <h2>1. Statut d'indépendance de la plateforme</h2>
          </div>
          <div className="p-4 bg-[#070B16] rounded-xl border border-amber-400/30 text-slate-300 text-xs leading-relaxed space-y-2">
            <p>
              <strong className="text-amber-300">{EVENT_CONFIG.disclaimer.independent}</strong>
            </p>
            <p className="text-slate-400">
              « Cap sur le Bourget » est une initiative citoyenne libre et auto-organisée. Elle n'est en aucun cas le site officiel de La France insoumise ni des organisateurs de l'événement. Elle utilise des codes graphiques populaires au service de la convergence démocratique.
            </p>
          </div>
        </section>

        {/* Section 2 : Définition légale du covoiturage & Zéro profit */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl uppercase">
            <FileText className="w-5 h-5 text-red-500" />
            <h2>2. Partage des frais & Respect strict du Code des transports</h2>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2.5">
            <p>
              Conformément à l'<strong className="text-white">article L. 3132-1 du Code des transports français</strong>, le covoiturage se définit comme l'utilisation en commun d'un véhicule terrestre à moteur par un conducteur et un ou plusieurs passagers, effectuée à titre non onéreux, excepté le partage des frais de déplacement dans le cadre d'un trajet que le conducteur effectue pour son propre compte.
            </p>
            <p className="text-slate-400 font-semibold">
              En conséquence :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li><strong className="text-white">Aucun profit n'est toléré :</strong> Le conducteur ne peut en aucun cas réaliser un bénéfice financier. Le montant demandé par passager ne doit couvrir qu'une quote-part raisonnable du carburant et des péages (plafond fixé à 0,08 €/km/passager).</li>
              <li><strong className="text-white">Zéro paiement en ligne :</strong> Le site ne perçoit aucune commission et n'encaisse aucun fonds. Le règlement s'effectue directement de la main à la main le jour du trajet.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 : Confidentialité & RGPD */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl uppercase">
            <Lock className="w-5 h-5 text-red-500" />
            <h2>3. Données personnelles & Numéro de téléphone protégé</h2>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              La plateforme applique le principe de minimisation des données (RGPD) :
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li><strong className="text-white">Numéro de téléphone strictement masqué :</strong> Aucun numéro de téléphone n'est affiché publiquement. Le numéro est uniquement dévoilé aux deux parties lorsqu'une réservation est mutuellement confirmée.</li>
              <li><strong className="text-white">Aucune exploitation commerciale :</strong> Les adresses email et coordonnées ne sont ni vendues, ni transmises à des tiers, ni utilisées à des fins publicitaires.</li>
              <li><strong className="text-white">Droit de suppression :</strong> Chaque citoyen peut modifier ou supprimer ses annonces et son profil à tout moment.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 : Sécurité routière & Assurances */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-white font-heading font-bold text-xl uppercase">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2>4. Assurances, Véhicules & Responsabilité</h2>
          </div>
          <div className="text-xs text-slate-400 leading-relaxed space-y-2">
            <p>
              Chaque conducteur certifie sur l'honneur être titulaire d'un permis de conduire en cours de validité et d'une assurance automobile obligatoire couvrant la responsabilité civile pour tous les tiers transportés.
            </p>
            <p>
              La plateforme met en relation bénévole les usagers et décline toute responsabilité en cas de litige, de retard, d'annulation ou d'incident survenu sur le trajet.
            </p>
          </div>
        </section>

        {/* Bouton retour */}
        <div className="pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => setCurrentPage('accueil')}
            className="bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};
