import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import ButtonBig from '../components/common/ButtonBig';
import Card from '../components/common/Card';
import styles from './HomePage.module.css';

export const HomePage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { statistics, childProfile } = useAppStore();

  const quickStats = [
    {
      label: t('stats.wordsLearned'),
      value: statistics.wordsLearned.length,
      icon: '📚'
    },
    {
      label: t('stats.gamesPlayed'),
      value: statistics.gamesPlayed.length,
      icon: '🎮'
    }
  ];

  return (
    <div className={`${styles.homePage}`}>
      <section className={styles.welcome}>
        <h2 className={styles.greeting}>
          {childProfile.name
            ? `Cześć, ${childProfile.name}! 👋`
            : 'Cześć! 👋'}
        </h2>
        <p className={styles.subtitle}>
          {t('menu.home')} - Zabawy edukacyjne dla Ciebie
        </p>
      </section>

      {/* Szybkie statystyki */}
      <section className={styles.quickStats}>
        {quickStats.map((stat, idx) => (
          <Card
            key={idx}
            title={stat.label}
            description={String(stat.value)}
            variant="highlight"
            size="medium"
            className={styles.statCard}
          />
        ))}
      </section>

      {/* Menu główne */}
      <section className={styles.mainMenu}>
        <h3 className={styles.sectionTitle}>Co chcesz robić?</h3>
        <div className={styles.buttonGrid}>
          <div className={styles.buttonWrapper}>
            <ButtonBig
              variant="primary"
              onClick={() => onNavigate('games')}
              ariaLabel="Przejdź do gier"
            >
              🎮 {t('menu.games')}
            </ButtonBig>
            <p className={styles.buttonDescription}>
              Gramy i uczymy się słów
            </p>
          </div>

          <div className={styles.buttonWrapper}>
            <ButtonBig
              variant="secondary"
              onClick={() => onNavigate('library')}
              ariaLabel="Przejdź do biblioteki słów"
            >
              📚 {t('menu.library')}
            </ButtonBig>
            <p className={styles.buttonDescription}>
              Przeglądaj słowa i obrazki
            </p>
          </div>

          <div className={styles.buttonWrapper}>
            <ButtonBig
              variant="success"
              onClick={() => onNavigate('statistics')}
              ariaLabel="Przejdź do statystyk"
            >
              📊 {t('menu.stats')}
            </ButtonBig>
            <p className={styles.buttonDescription}>
              Twój postęp i osiągnięcia
            </p>
          </div>

          <div className={styles.buttonWrapper}>
            <ButtonBig
              variant="danger"
              onClick={() => onNavigate('settings')}
              ariaLabel="Przejdź do ustawień"
            >
              ⚙️ {t('menu.settings')}
            </ButtonBig>
            <p className={styles.buttonDescription}>
              Dostosuj aplikację
            </p>
          </div>
        </div>
      </section>

      {/* Motywacyjny komunikat */}
      <section className={styles.motivation}>
        <div className={styles.motivationCard}>
          <p className={styles.motivationText}>
            ✨ Świetnie się uczysz! Kontynuuj taką dobrą pracę! ✨
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
