import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Car, PlusCircle, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, setCurrentPage, unreadCount } = useApp();

  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: Search },
    { id: 'recherche', label: 'Trajets', icon: Car },
    { id: 'publier', label: 'Proposer', icon: PlusCircle, isPrimary: true },
    { id: 'messagerie', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <nav 
      aria-label="Navigation mobile principale" 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#070B16] text-white border-t border-white/[0.08] z-50 flex items-center justify-around py-2 px-3 shadow-[0_-10px_25px_rgba(0,0,0,0.7)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        if (item.isPrimary) {
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as any)}
              className="flex flex-col items-center justify-center -mt-6 bg-gradient-to-r from-[#E4002B] to-[#C90026] text-white p-3 rounded-2xl shadow-[0_0_20px_rgba(228,0,43,0.4)] active:scale-95 transition border border-red-500/40"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase mt-0.5 tracking-wider font-mono">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as any)}
            className={`flex flex-col items-center justify-center py-1 px-2 relative transition ${
              isActive ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#E4002B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight font-mono">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wide mt-1 font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
