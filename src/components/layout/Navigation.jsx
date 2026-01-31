import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './Navigation.module.css';

export const Navigation = ({ currentPage, onNavigate }) => {
  const { t } = useTranslation();
  const { accessibility } = useAppStore();

  const navigationItems = [
    { id: 'home', label: '🏠', title: t('menu.home') },
    { id: 'games', label: '🎮', title: t('menu.games') },
    { id: 'library', label: '📚', title: t('menu.library') },
    { id: 'statistics', label: '📊', title: t('menu.stats') },
    { id: 'settings', label: '⚙️', title: t('menu.settings') }
  ];

  return (
    <nav className={`app-nav ${styles.navigation}`}>
      {navigationItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.navButton} ${currentPage === item.id ? styles.active : ''}`}
          onClick={() => onNavigate(item.id)}
          title={item.title}
          aria-label={item.title}
          aria-pressed={currentPage === item.id}
        >
          <span className={styles.icon}>{item.label}</span>
          <span className={styles.label}>{item.title}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
