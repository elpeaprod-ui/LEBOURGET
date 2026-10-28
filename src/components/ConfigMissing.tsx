import React from 'react';

/** Écran affiché tant que les variables Firebase ne sont pas renseignées. */
export const ConfigMissing: React.FC = () => (
  <div className="min-h-screen bg-[#05070E] text-slate-100 flex items-center justify-center p-6">
    <div className="titanium-card rounded-2xl max-w-lg p-8 space-y-4 text-center">
      <h1 className="font-heading font-black text-2xl uppercase text-white">Configuration requise</h1>
      <p className="text-sm text-slate-300">
        Le site n'est pas encore relié à sa base de données. Renseigne les variables <code className="font-mono text-amber-300">VITE_FIREBASE_*</code>{' '}
        (voir le fichier <code className="font-mono text-amber-300">.env.example</code> et le guide <code className="font-mono text-amber-300">FIREBASE_SETUP.md</code>),
        puis relance le site.
      </p>
    </div>
  </div>
);
