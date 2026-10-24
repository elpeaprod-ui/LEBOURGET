import React from 'react';
import { EVENT_CONFIG } from '../config/event.config';
import { useApp } from '../context/AppContext';
import { AlertCircle, ShieldCheck, MailCheck, MailWarning } from 'lucide-react';

export const LegalBanner: React.FC = () => {
  const { currentUser, toggleEmailVerified } = useApp();

  return (
    <div className="bg-[#070D1E] text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 border border-amber-400/30 text-[11px] uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            Initiative citoyenne
          </span>
          <p className="leading-snug text-slate-300">
            {EVENT_CONFIG.disclaimer.independent}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
          <span className="text-amber-300 font-semibold text-[11px] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {EVENT_CONFIG.disclaimer.provisional}
          </span>

          {/* Simulateur de statut email pour tests et conformité */}
          <button
            onClick={toggleEmailVerified}
            title="Cliquer pour simuler la validation du lien d'email"
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase transition ${
              currentUser.emailVerified
                ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-700/60 hover:bg-emerald-900'
                : 'bg-red-950/70 text-red-300 border border-red-700/60 hover:bg-red-900 animate-bounce'
            }`}
          >
            {currentUser.emailVerified ? (
              <>
                <MailCheck className="w-3 h-3 text-emerald-400" />
                Email confirmé (lien vérifié)
              </>
            ) : (
              <>
                <MailWarning className="w-3 h-3 text-red-400" />
                Email en attente de confirmation
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
