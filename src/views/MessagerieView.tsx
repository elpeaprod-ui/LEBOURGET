import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, MessageSquare, User, Car, Clock, ShieldCheck, 
  Sparkles, CheckCheck, ArrowRight 
} from 'lucide-react';

export const MessagerieView: React.FC = () => {
  const { 
    currentUser, 
    conversations, 
    messages, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage,
    trips,
    setSelectedTripId,
    setCurrentPage 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeMessages = messages.filter((m) => m.conversationId === activeConv?.id);
  const activeTrip = activeConv ? trips.find((t) => t.id === activeConv.trajetId) : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage.trim());
    setInputMessage('');
  };

  const sendQuickReply = (text: string) => {
    if (!activeConv) return;
    sendMessage(activeConv.id, text);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-28 space-y-6 text-slate-100">
      
      {/* En-tête Apple Titanium Style */}
      <div className="titanium-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
            Canal Sécurisé
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-0.5">
            Messagerie Citoyenne
          </h1>
          <p className="text-xs text-slate-400">
            Échange direct entre conducteurs et passagers pour caler les détails du ralliement.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" />
          <span>Échanges chiffrés & sans intermédiaire</span>
        </div>
      </div>

      {/* Interface de chat en deux colonnes style macOS */}
      <div className="titanium-card rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] h-[65vh]">
        
        {/* Colonne Gauche : Liste des conversations */}
        <div className="md:col-span-4 border-r border-white/[0.08] flex flex-col bg-[#070B16]">
          <div className="p-3.5 border-b border-white/[0.08] bg-[#0A0F1D] font-mono text-xs uppercase text-slate-400 font-semibold tracking-wider flex items-center justify-between">
            <span>Conversations</span>
            <span className="text-white bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{conversations.length}</span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-white/[0.04]">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-mono">
                Aucune conversation active pour l'instant.
              </div>
            ) : (
              conversations.map((conv) => {
                const isActive = conv.id === activeConv?.id;
                const otherParticipant = conv.participants.find((p) => p.id !== currentUser.id);

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full text-left p-3.5 transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-[#12192F] border-l-2 border-[#E4002B]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E4002B] to-red-800 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {otherParticipant?.nom ? otherParticipant.nom[0] : 'C'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-semibold text-xs text-white truncate">
                          {otherParticipant?.nom || 'Membre citoyen'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {conv.derniereDate}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate mb-1">
                        {conv.trajetTitre}
                      </div>
                      <p className="text-xs text-slate-300 truncate">
                        {conv.dernierMessage}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Colonne Droite : Fil de discussion actif */}
        <div className="md:col-span-8 flex flex-col h-full bg-[#080C18]">
          
          {activeConv ? (
            <>
              {/* En-tête de la conversation */}
              <div className="p-3.5 border-b border-white/[0.08] bg-[#0A0F1D] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-white flex items-center gap-2">
                    <span>
                      {activeConv.participants.find((p) => p.id !== currentUser.id)?.nom || 'Interlocuteur'}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="En ligne" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Convoi : <strong className="text-slate-200">{activeConv.trajetTitre}</strong>
                  </div>
                </div>

                {activeTrip && (
                  <button
                    onClick={() => {
                      setSelectedTripId(activeTrip.id);
                      setCurrentPage('detail');
                    }}
                    className="text-xs font-semibold uppercase text-red-400 hover:text-red-300 transition"
                  >
                    Voir le trajet →
                  </button>
                )}
              </div>

              {/* Zone des messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#060914]">
                {activeMessages.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    Démarre la discussion pour caler l'heure exacte ou le lieu de rendez-vous.
                  </div>
                ) : (
                  activeMessages.map((msg) => {
                    const isMe = msg.expediteurId === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[10px] text-slate-500 mb-0.5 px-1 font-mono">
                          {isMe ? 'Moi' : msg.expediteurNom}
                        </div>
                        <div
                          className={`max-w-md p-3 rounded-xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-gradient-to-r from-[#E4002B] to-[#C90026] text-white shadow-sm'
                              : 'bg-[#0E1528] text-slate-200 border border-white/10 shadow-sm'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.texte}</p>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 flex items-center gap-1 px-1 font-mono">
                          {msg.timestamp}
                          {isMe && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Raccourcis de questions rapides */}
              <div className="px-3 py-2 bg-[#0A0F1D] border-t border-white/[0.08] flex items-center gap-2 overflow-x-auto text-xs">
                <span className="text-[10px] text-slate-500 font-mono uppercase shrink-0">Réponses rapides :</span>
                {[
                  "On arrive bien vers 13h pour l'ouverture ?",
                  "Où se retrouve-t-on exactement ?",
                  "As-tu de la place pour un sac à dos ?"
                ].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => sendQuickReply(quick)}
                    className="shrink-0 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-2.5 py-1 text-[11px] font-medium rounded-lg border border-white/10 transition"
                  >
                    {quick}
                  </button>
                ))}
              </div>

              {/* Formulaire d'envoi */}
              <form onSubmit={handleSend} className="p-3 border-t border-white/[0.08] bg-[#0A0F1D] flex gap-2">
                <input
                  type="text"
                  placeholder="Écris ton message pour ce covoiturage solidaire..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-white/10 rounded-xl bg-[#070B16] text-white focus:border-red-500 focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] disabled:bg-neutral-800 disabled:text-slate-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs font-mono">
              Sélectionne une conversation pour démarrer
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
