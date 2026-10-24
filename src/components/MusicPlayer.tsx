import React, { useState } from 'react';
import { Radio, Play, Pause, Volume2, X, Music, ExternalLink, Sparkles, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const youtubeVideoId = "ysF7Tcw4HbY";
  const songTitle = "HK & Les Saltimbanks — « On lâche rien ! »";

  return (
    <>
      {/* Dynamic Island style audio widget (Apple / macOS style) */}
      <div className="fixed bottom-16 lg:bottom-6 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setIsPlaying(true);
          }}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-2xl transition-all duration-300 border ${
            isOpen || isPlaying
              ? 'bg-[#0E1528] text-white border-red-500/60 shadow-[0_0_20px_rgba(228,0,43,0.35)]'
              : 'bg-[#0A0F1D] text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
          }`}
          title="L'Autoradio populaire : HK - On lâche rien"
          aria-label="Lecteur musique de route"
        >
          {/* Animated Equalizer Wave Bars */}
          <div className="flex items-end gap-[3px] h-4 w-4">
            <span className={`w-1 bg-[#E4002B] rounded-full ${isPlaying ? 'animate-wave-1' : 'h-2'}`} />
            <span className={`w-1 bg-amber-400 rounded-full ${isPlaying ? 'animate-wave-2' : 'h-3.5'}`} />
            <span className={`w-1 bg-white rounded-full ${isPlaying ? 'animate-wave-3' : 'h-1.5'}`} />
            <span className={`w-1 bg-[#E4002B] rounded-full ${isPlaying ? 'animate-wave-4' : 'h-2.5'}`} />
          </div>

          <div className="flex items-center gap-2 text-left">
            <span className="font-heading font-bold text-white text-xs tracking-tight">Autoradio</span>
            <span className="text-slate-500 text-[10px]">·</span>
            <span className="text-slate-300 text-[11px] truncate max-w-[130px] sm:max-w-[190px]">
              On lâche rien !
            </span>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </motion.button>
      </div>

      {/* Pop-up Player Modal with Apple Mac-grade sleek dark titanium finish */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 lg:bottom-20 left-4 z-50 w-[92vw] sm:w-[440px] bg-[#0A0F1D] text-white border border-white/15 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header style macOS / titanium bar */}
            <div className="bg-[#10172B] px-4 py-3 flex items-center justify-between border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E4002B] to-red-700 flex items-center justify-center text-white shadow-sm">
                  <Disc3 className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Bande-son du 7 Novembre
                  </div>
                  <div className="text-xs font-semibold text-white truncate max-w-[220px]">
                    {songTitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
                  title="Ouvrir sur YouTube"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lecteur Iframe YouTube officiel */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="HK et Les Saltimbanks - On lâche rien"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer de route */}
            <div className="px-4 py-3 bg-[#080C17] text-[11px] text-slate-400 flex items-center justify-between border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-slate-300 font-medium">Pour faire vibrer le bitume vers Le Bourget</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-red-400 hover:text-red-300 transition"
              >
                Réduire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
