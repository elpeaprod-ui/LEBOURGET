import React, { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

type Mode = 'connexion' | 'inscription';

const inputClass =
  'w-full px-3 py-2 rounded-xl border border-white/10 text-sm bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition';
const labelClass = 'block text-[11px] font-mono uppercase text-slate-400 font-semibold';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signUp, logIn, resetPassword } = useApp();

  const [mode, setMode] = useState<Mode>('connexion');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const close = () => {
    setIsAuthModalOpen(false);
    setError(null);
    setInfo(null);
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const err =
      mode === 'connexion'
        ? await logIn(email, password)
        : await signUp({ email, password, prenom, nom, telephone });
    setLoading(false);
    if (err) setError(err);
    else setPassword('');
  };

  const handleReset = async () => {
    setError(null);
    setInfo(null);
    const err = await resetPassword(email);
    if (err) setError(err);
    else setInfo("Email de réinitialisation envoyé. Pense à vérifier tes spams.");
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Connexion ou inscription"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="titanium-card rounded-2xl w-full max-w-md p-6 space-y-5 text-slate-100 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Espace citoyen
            </div>
            <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-white">
              {mode === 'connexion' ? 'Connexion' : 'Créer un compte'}
            </h2>
          </div>
          <button onClick={close} className="text-slate-400 hover:text-white p-1" aria-label="Fermer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
          {(['connexion', 'inscription'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(null); setInfo(null); }}
              className={`py-2 text-xs font-bold uppercase rounded-lg transition flex items-center justify-center gap-1.5 ${
                mode === m ? 'bg-[#E4002B] text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {m === 'connexion' ? <LogIn className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
              {m === 'connexion' ? 'Se connecter' : "S'inscrire"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'inscription' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={labelClass}>Prénom *</label>
                  <input className={inputClass} value={prenom} onChange={(e) => setPrenom(e.target.value)} required autoComplete="given-name" />
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Nom *</label>
                  <input className={inputClass} value={nom} onChange={(e) => setNom(e.target.value)} required autoComplete="family-name" />
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelClass}>Téléphone *</label>
                <input
                  className={inputClass}
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  required
                  autoComplete="tel"
                />
                <p className="text-[10px] text-slate-500">
                  Jamais affiché publiquement : visible uniquement par la personne avec qui tu partages un trajet confirmé.
                </p>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className={labelClass}>Email *</label>
            <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Mot de passe *</label>
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'connexion' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="bg-red-950/60 border border-red-500/40 text-red-200 text-xs p-3 rounded-xl">{error}</div>
          )}
          {info && (
            <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs p-3 rounded-xl">{info}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E4002B] hover:bg-red-600 disabled:opacity-60 text-white py-2.5 text-xs font-bold uppercase rounded-xl transition"
          >
            {loading ? 'Un instant…' : mode === 'connexion' ? 'Me connecter' : 'Créer mon compte'}
          </button>

          {mode === 'connexion' && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full text-[11px] text-slate-400 hover:text-white underline underline-offset-2"
            >
              Mot de passe oublié ?
            </button>
          )}
        </form>

        {mode === 'inscription' && (
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Un email de confirmation te sera envoyé : tu devras cliquer sur le lien pour pouvoir réserver ou publier un trajet.
          </p>
        )}
      </div>
    </div>
  );
};
