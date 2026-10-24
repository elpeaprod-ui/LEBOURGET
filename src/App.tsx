import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LegalBanner } from './components/LegalBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { MusicPlayer } from './components/MusicPlayer';

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
  const { currentPage } = useApp();

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
        {currentPage === 'publier' && <ProposerTrajetView />}
        {currentPage === 'mes-trajets' && <MesTrajetsView />}
        {currentPage === 'messagerie' && <MessagerieView />}
        {currentPage === 'profil' && <ProfilView />}
        {currentPage === 'pourquoi' && <PourquoiCeSiteView />}
        {currentPage === 'signalement' && <SignalementView />}
        {currentPage === 'mentions' && <MentionsEtReglesView />}
      </main>

      {/* 4. Footer citoyen complet avec mentions légales */}
      <Footer />

      {/* 5. Barre de navigation mobile ergonomique */}
      <MobileBottomNav />

      {/* 6. Lecteur de musique populaire intégré (HK - On lâche rien) */}
      <MusicPlayer />

      {/* 7. Notifications Toast */}
      <ToastContainer />
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
