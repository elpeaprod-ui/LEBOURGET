import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, PlusCircle, MessageSquare, User, Search, 
  Menu, X, Shield, ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currentUser, 
    unreadCount, 
    bookings, 
    trips
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userBookingsCount = bookings.filter(b => b.passagerId === currentUser.id).length;
  const userTripsCount = trips.filter(t => t.conducteurId === currentUser.id).length;
  const myTotalTrips = userBookingsCount + userTripsCount;

  const navigateTo = (page: any) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#070B16] text-white sticky top-0 z-40 border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo & Identité Apple-grade */}
        <button
          onClick={() => navigateTo('accueil')}
          className="flex items-center gap-3 text-left focus:outline-none group"
          aria-label="Accueil Cap sur le Bourget"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-b from-[#E4002B] to-[#99001D] flex items-center justify-center font-display text-2xl font-black text-white shadow-[0_0_15px_rgba(228,0,43,0.3)] border border-white/20 group-hover:scale-105 transition-transform duration-200">
            7N
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-red-400 transition-colors flex items-center gap-2">
              <span>CAP SUR LE BOURGET</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-slate-400 font-normal">
                7 NOV
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-normal flex items-center gap-1.5">
              <span>Plateforme citoyenne solidaire</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400/90 font-medium">100% bénévole</span>
            </div>
          </div>
        </button>

        {/* Navigation Bureau Apple-style Minimalist */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={() => navigateTo('recherche')}
            className={`px-3.5 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all duration-200 ${
              currentPage === 'recherche'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            Chercher un trajet
          </button>

          <button
            onClick={() => navigateTo('publier')}
            className="bg-gradient-to-r from-[#E4002B] to-[#C90026] hover:from-[#F00030] hover:to-[#B50020] text-white px-4 py-2 text-xs font-bold tracking-wide rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(228,0,43,0.3)] hover:shadow-[0_0_20px_rgba(228,0,43,0.5)] border border-red-500/30 active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Proposer un trajet</span>
          </button>

          <button
            onClick={() => navigateTo('mes-trajets')}
            className={`relative px-3.5 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all duration-200 ${
              currentPage === 'mes-trajets'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <span>Mes trajets</span>
            {myTotalTrips > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-neutral-800 border border-white/10 text-white rounded text-[10px] font-mono">
                {myTotalTrips}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('messagerie')}
            className={`relative px-3.5 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
              currentPage === 'messagerie'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#E4002B] text-white text-[10px] font-bold rounded-full animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('pourquoi')}
            className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-lg transition-all duration-200 border ${
              currentPage === 'pourquoi'
                ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                : 'text-amber-300/90 hover:text-amber-200 border-amber-400/20 hover:border-amber-400/40 hover:bg-amber-400/10'
            }`}
          >
            Pourquoi ce site ?
          </button>

          {/* Profil Utilisateur Mac-style Glass Pill */}
          <button
            onClick={() => navigateTo('profil')}
            className="ml-2 flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 px-3 py-1.5 rounded-xl transition-all duration-200 text-left"
            title="Mon profil et coordonnées"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E4002B] to-red-800 text-white font-bold text-xs flex items-center justify-center">
              {currentUser.prenom[0]}
            </div>
            <div className="text-left leading-tight hidden xl:block">
              <div className="text-xs font-semibold text-slate-200">{currentUser.prenom}</div>
              <div className="text-[10px] text-emerald-400 font-mono">
                {currentUser.emailVerified ? 'Vérifié' : 'À valider'}
              </div>
            </div>
          </button>
        </nav>

        {/* Actions & Menu Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => navigateTo('publier')}
            className="bg-[#E4002B] text-white px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Proposer</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] focus:outline-none"
            aria-label="Ouvrir le menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile déroulant titanium style */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E1A] border-t border-white/[0.08] px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E4002B] text-white font-bold flex items-center justify-center">
                {currentUser.prenom[0]}
              </div>
              <div>
                <div className="font-semibold text-sm text-white">{currentUser.prenom} {currentUser.nom}</div>
                <div className="text-xs text-slate-400">{currentUser.email}</div>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('profil')} 
              className="text-xs font-semibold text-red-400 uppercase tracking-wide hover:underline"
            >
              Mon profil
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5 font-medium text-sm">
            <button
              onClick={() => navigateTo('recherche')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Chercher un trajet</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={() => navigateTo('publier')}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-200 hover:bg-red-950/60 flex items-center justify-between font-semibold"
            >
              <span className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-red-400" />
                <span>Proposer un trajet solidaire</span>
              </span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </button>

            <button
              onClick={() => navigateTo('mes-trajets')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-slate-400" />
                <span>Mes réservations & trajets</span>
              </span>
              {myTotalTrips > 0 && (
                <span className="px-2 py-0.5 bg-neutral-800 text-white rounded text-xs font-mono">
                  {myTotalTrips}
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('messagerie')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/[0.06] flex items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span>Messagerie directe</span>
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-[#E4002B] text-white rounded-full text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('pourquoi')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-amber-300 hover:bg-amber-400/10 flex items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Pourquoi ce site ? (Cadre constitutionnel)</span>
              </span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
