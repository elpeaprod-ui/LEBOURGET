import React from 'react';
import { EVENT_CONFIG } from '../config/event.config';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Scale, Heart, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-[#05070E] text-slate-400 text-xs py-12 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Colonne 1 : Statut citoyen & démarche */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E4002B] to-[#99001D] text-white font-heading font-black text-sm flex items-center justify-center border border-white/20">
              7N
            </div>
            <div>
              <div className="font-heading font-bold text-lg uppercase tracking-tight text-white">
                CAP SUR LE BOURGET
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Covoiturons ensemble pour le 7 novembre 2026
              </div>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs max-w-lg">
            Plateforme citoyenne et bénévole de partage solidaire de véhicules. Aucun profit n'est réalisé par la plateforme ni par les conducteurs. Les frais de trajet sont strictement partagés en main propre, de citoyenne à citoyen, dans le respect du Code des transports.
          </p>

          {/* ENCADRÉ OBLIGATOIRE DE STATUT D'INDÉPENDANCE (Subtle all-around hairline border) */}
          <div className="p-3.5 bg-[#0C101D] border border-amber-400/30 rounded-xl text-slate-300 space-y-1">
            <div className="text-amber-400 font-mono font-semibold uppercase text-[10px] flex items-center gap-1.5 tracking-wider">
              <span>Statut Indépendant & Citoyen :</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {EVENT_CONFIG.disclaimer.independent}
            </p>
          </div>
        </div>

        {/* Colonne 2 : Navigation rapide */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold pb-1 border-b border-white/[0.08]">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => setCurrentPage('accueil')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>→</span> Accueil du site
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('recherche')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>→</span> Chercher un trajet
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('publier')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>→</span> Proposer des places libres
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('mes-trajets')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>→</span> Mes trajets & réservations
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('pourquoi')} 
                className="text-amber-300 font-semibold hover:text-amber-200 transition flex items-center gap-1.5"
              >
                <span>⚖️</span> Pourquoi ce site ? (Constitution)
              </button>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Règles, Sécurité & Signalement */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold pb-1 border-b border-white/[0.08]">
            Règles & Sécurité
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => setCurrentPage('mentions')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>✓</span> Plafond légal au km (0,08 €/km)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('mentions')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>✓</span> Téléphone masqué avant validation
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('mentions')} 
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <span>✓</span> Respect de la vie privée (RGPD)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('signalement')} 
                className="text-red-400 hover:text-red-300 transition flex items-center gap-1.5 font-semibold"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Signaler un abus ou faux profil
              </button>
            </li>
            <li>
              <a
                href={EVENT_CONFIG.officialLinks.lfiWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition inline-flex items-center gap-1 pt-1"
              >
                Canaux officiels LFI <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre basse finale */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-[11px]">
        <p className="text-slate-500">
          © 2026 <strong>Cap sur le Bourget</strong> — Initiative citoyenne solidaire sans but lucratif.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-slate-500">
          <button onClick={() => setCurrentPage('mentions')} className="hover:text-slate-300 transition">
            Conditions d'utilisation (CGU)
          </button>
          <span>·</span>
          <button onClick={() => setCurrentPage('pourquoi')} className="hover:text-amber-300 transition">
            Libertés démocratiques & Droit de réunion
          </button>
          <span>·</span>
          <button onClick={() => setCurrentPage('signalement')} className="hover:text-slate-300 transition">
            Modération citoyenne
          </button>
        </div>
      </div>
    </footer>
  );
};
