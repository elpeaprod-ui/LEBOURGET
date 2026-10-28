import React from 'react';
import { Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

/** Affiche un écran d'invitation à se connecter à la place d'une page réservée aux membres. */
export const AuthGate: React.FC<{ title: string }> = ({ title }) => {
  const { setIsAuthModalOpen } = useApp();

  return (
    <div className="max-w-xl mx-auto px-4 py-16 pb-28 text-center space-y-4 text-slate-100">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
        <Lock className="w-6 h-6 text-slate-300" />
      </div>
      <h2 className="font-heading font-extrabold text-2xl uppercase text-white">{title}</h2>
      <p className="text-slate-400 text-sm">
        Cette page est réservée aux membres. Connecte-toi ou crée un compte gratuit pour continuer.
      </p>
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="bg-[#E4002B] hover:bg-red-600 text-white px-6 py-2.5 text-xs font-bold uppercase rounded-xl transition"
      >
        Se connecter / S'inscrire
      </button>
    </div>
  );
};
