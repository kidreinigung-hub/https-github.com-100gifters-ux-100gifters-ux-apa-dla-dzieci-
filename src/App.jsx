import React, { useEffect, useState } from 'react';
import { useAppStore } from './store/appStore';
import './styles/variables.css';
import './App.css';

// Import Stron
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import LibraryPage from './pages/LibraryPage';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';

// Import Layout
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';

function App() {
  const { language, accessibility } = useAppStore();
  const [currentPage, setCurrentPage] = useState('home');

  // Ustaw język aplikacji
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Ustaw klasy dostępności
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.className = '';

      if (accessibility.blackAndWhite) {
        root.classList.add('bw');
      }
      if (accessibility.highContrast) {
        root.classList.add('highContrast');
      }
      if (accessibility.hideAnimations) {
        root.classList.add('hideAnimations');
      }

      // Ustawianie rozmiaru tekstu
      root.style.fontSize = {
        small: '14px',
        medium: '16px',
        large: '20px',
        'extra-large': '24px'
      }[accessibility.textSize] || '16px';
    }
  }, [accessibility]);

  const renderPage = () => {
    switch (currentPage) {
      case 'games':
        return <GamesPage />;
      case 'library':
        return <LibraryPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'home':
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        {renderPage()}
      </div>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
