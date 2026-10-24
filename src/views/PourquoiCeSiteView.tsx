import React from 'react';
import { useApp } from '../context/AppContext';
import { Scale, ShieldCheck, BookOpen, ArrowRight, Heart, Users } from 'lucide-react';

export const PourquoiCeSiteView: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pb-28 space-y-8 text-slate-100">
      
      {/* Carte principale avec style Apple Titanium */}
      <div className="titanium-card rounded-2xl p-6 sm:p-10 md:p-12 space-y-8">
        
        {/* Titre percutant */}
        <div className="border-b border-white/[0.08] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 font-semibold">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Cadre Républicain & Libertés Fondamentales</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
            POURQUOI CE SITE ?
          </h1>
        </div>

        {/* TEXTE STRICTEMENT CONFORME AU TEXTE DEMANDÉ */}
        <div className="space-y-6 text-slate-300 leading-relaxed">
          
          <p className="text-base sm:text-lg font-medium text-white p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            Se rassembler, écouter, débattre : c'est le fonctionnement normal d'une démocratie. Cap sur le Bourget aide simplement chacune et chacun à se rendre à un événement politique public, en partageant les frais du trajet.
          </p>

          <div className="pt-2">
            <h2 className="font-heading font-black text-xl sm:text-2xl uppercase text-red-400 tracking-tight mb-4">
              Ce que dit notre Constitution :
            </h2>

            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="p-4 bg-[#070B16] rounded-xl border border-white/[0.06]">
                <strong className="text-white block font-heading font-bold mb-1 text-sm">
                  Article 4 de la Constitution de 1958 :
                </strong>
                les partis et groupements politiques concourent à l'expression du suffrage et exercent leur activité librement.
              </li>

              <li className="p-4 bg-[#070B16] rounded-xl border border-white/[0.06]">
                <strong className="text-white block font-heading font-bold mb-1 text-sm">
                  Articles 10 et 11 de la Déclaration de 1789 :
                </strong>
                nul ne doit être inquiété pour ses opinions, et la libre communication des pensées et des opinions est un droit précieux.
              </li>

              <li className="p-4 bg-[#070B16] rounded-xl border border-white/[0.06]">
                <strong className="text-white block font-heading font-bold mb-1 text-sm">
                  Le Conseil constitutionnel :
                </strong>
                Le Conseil constitutionnel reconnaît un droit d'expression collective des idées et des opinions (décisions 94-352 DC du 18 janvier 1995 et 2019-780 DC du 4 avril 2019).
              </li>

              <li className="p-4 bg-[#070B16] rounded-xl border border-white/[0.06]">
                <strong className="text-white block font-heading font-bold mb-1 text-sm">
                  La loi du 30 juin 1881 :
                </strong>
                La loi du 30 juin 1881 consacre la liberté des réunions publiques.
              </li>

              <li className="p-4 bg-[#070B16] rounded-xl border border-white/[0.06]">
                <strong className="text-white block font-heading font-bold mb-1 text-sm">
                  Convention européenne des droits de l'homme :
                </strong>
                L'article 11 de la Convention européenne des droits de l'homme protège la liberté de réunion pacifique.
              </li>
            </ul>
          </div>

          <p className="text-xs sm:text-sm font-medium text-amber-300 italic bg-amber-950/40 p-4 rounded-xl border border-amber-400/30">
            Ces libertés s'exercent dans le cadre de la loi et de l'ordre public.
          </p>

          <div className="p-6 bg-[#070B16] text-white rounded-xl border border-white/10 space-y-2 mt-4">
            <h3 className="font-heading font-bold text-lg uppercase tracking-tight text-white">
              Ce que fait ce site :
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Il n'organise aucun rassemblement, il met en relation des citoyens qui veulent s'y rendre ensemble, de façon bénévole, sans profit et sans paiement en ligne.
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setCurrentPage('accueil')}
            className="text-xs font-semibold uppercase text-slate-400 hover:text-white transition"
          >
            ← Retour à l'accueil
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setCurrentPage('recherche')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition shadow flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Trouver un trajet</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('publier')}
              className="w-full sm:w-auto bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition"
            >
              Proposer des places
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
