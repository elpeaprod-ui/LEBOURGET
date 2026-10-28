import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LegalBanner } from './components/LegalBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { MusicPlayer } from './components/MusicPlayer';
import { AuthModal } from './components/AuthModal';
import { AuthGate } from './components/AuthGate';
import { ConfigMissing } from './components/ConfigMissing';

// Views
import { AccueilView } from './views/AccueilView';
import { ResultatsView } from './views/ResultatsView';
import { DetailTrajetView } from './views/DetailTrajetView';
import { ProposerTrajetView } from './views/ProposerTrajetView';
import { MesTrajetsView } from './views/MesTrajetsView';
import { MessagerieView } from './views/MessagerieView';
import { ProfilView } from './views/ProfilView';
import { PourquoiCeSiteView } from './views/PourquoiCeSiteView';
import { SignalementView } from './views/SignalementView';
import { MentionsEtReglesView } from './views/MentionsEtReglesView';

const MainContent: React.FC = () => {
  const { currentPage, firebaseReady, authReady, isLoggedIn } = useApp();

  if (!firebaseReady) return <ConfigMissing />;
  if (!authReady) {
    return <div className="min-h-screen bg-[#05070E] flex items-center justify-center text-slate-400 text-sm font-mono">Chargement…</div>;
  }

  return (
    <div className="min-h-screen bg-[#05070E] flex flex-col text-slate-100 selection:bg-[#E4002B] selection:text-white">
      {/* 1. Bandeau supérieur obligatoire de statut citoyen indépendant */}
      <LegalBanner />

      {/* 2. Barre de navigation principale */}
      <Navbar />

      {/* 3. Corps dynamique de l'application selon la page active */}
      <main className="flex-1">
        {currentPage === 'accueil' && <AccueilView />}
        {currentPage === 'recherche' && <ResultatsView />}
        {currentPage === 'detail' && <DetailTrajetView />}
        {currentPage === 'publier' && (isLoggedIn ? <ProposerTrajetView /> : <AuthGate title="Proposer un trajet" />)}
        {currentPage === 'mes-trajets' && (isLoggedIn ? <MesTrajetsView /> : <AuthGate title="Mes trajets" />)}
        {currentPage === 'messagerie' && (isLoggedIn ? <MessagerieView /> : <AuthGate title="Messagerie" />)}
        {currentPage === 'profil' && (isLoggedIn ? <ProfilView /> : <AuthGate title="Mon profil" />)}
        {currentPage === 'pourquoi' && <PourquoiCeSiteView />}
        {currentPage === 'signalement' && <SignalementView />}
        {currentPage === 'mentions' && <MentionsEtReglesView />}
      </main>

      {/* 4. Footer citoyen complet avec mentions légales */}
      <Footer />

      {/* 5. Barre de navigation mobile ergonomique */}
      <MobileBottomNav />

      {/* 6. Lecteur de musique populaire intégré (Rød - L'Avenir en commun) */}
      <MusicPlayer />

      {/* 7. Notifications Toast */}
      <ToastContainer />

      {/* 8. Connexion / inscription */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
