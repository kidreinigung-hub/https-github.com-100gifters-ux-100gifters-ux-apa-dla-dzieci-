import React from 'react';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

export const Header = () => {
  const { t } = useTranslation();
  const { language, accessibility } = useAppStore();

  return (
    <header className={`app-header ${styles.header}`}>
      <div className={styles.title}>
        <h1>🎮 Autyzm</h1>
      </div>
      <div className={styles.info}>
        <span className={styles.language}>{language.toUpperCase()}</span>
      </div>
    </header>
  );
};

export default Header;
