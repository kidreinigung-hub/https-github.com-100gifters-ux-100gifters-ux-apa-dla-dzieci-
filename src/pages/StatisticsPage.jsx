import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import ButtonBig from '../components/common/ButtonBig';
import Card from '../components/common/Card';
import styles from './StatisticsPage.module.css';

export const StatisticsPage = () => {
  const { t } = useTranslation();
  const { statistics } = useAppStore();

  const accuracy = statistics.gamesPlayed.length > 0
    ? Math.round(
        (statistics.gamesPlayed.filter((g) => g.isCorrect).length /
          statistics.gamesPlayed.length) *
          100
      )
    : 0;

  const handleExportPDF = () => {
    // TODO: Implementacja eksportu do PDF
    console.log('Export to PDF clicked');
    alert('Eksport do PDF będzie dostępny wkrótce!');
  };

  return (
    <div className={styles.statsPage}>
      <h2 className={styles.title}>📊 {t('stats.title')}</h2>

      {/* Główne statystyki */}
      <div className={styles.mainStats}>
        <Card
          title={t('stats.wordsLearned')}
          description={String(statistics.wordsLearned.length)}
          variant="highlight"
          size="large"
        />
        <Card
          title={t('stats.gamesPlayed')}
          description={String(statistics.gamesPlayed.length)}
          variant="highlight"
          size="large"
        />
        <Card
          title={t('stats.accuracy')}
          description={`${accuracy}%`}
          variant="highlight"
          size="large"
        />
      </div>

      {/* Szczegółowe dane */}
      <div className={styles.detailedStats}>
        <div className={styles.statCard}>
          <h3 className={styles.cardTitle}>🎮 Ostatnie gry</h3>
          {statistics.gamesPlayed.length > 0 ? (
            <div className={styles.gamesList}>
              {statistics.gamesPlayed.slice(-5).map((game, idx) => (
                <div key={idx} className={styles.gameItem}>
                  <span>{game.gameId}</span>
                  <span className={styles.score}>{game.score} pkt</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noData}>Brak danych o grach</p>
          )}
        </div>

        <div className={styles.statCard}>
          <h3 className={styles.cardTitle}>📚 Opanowane słowa</h3>
          {statistics.wordsLearned.length > 0 ? (
            <p className={styles.wordCount}>
              {statistics.wordsLearned.length} słów opanowanych!
            </p>
          ) : (
            <p className={styles.noData}>Zacznij uczyć się słów!</p>
          )}
        </div>
      </div>

      {/* Akcje */}
      <div className={styles.actions}>
        <ButtonBig
          variant="success"
          onClick={handleExportPDF}
        >
          📄 {t('button.export')}
        </ButtonBig>
      </div>

      {/* Motywacyjny komunikat */}
      <div className={styles.motivation}>
        <p className={styles.motivationText}>
          🌟 Świetnie się uczysz! Kontynuuj! 🌟
        </p>
      </div>
    </div>
  );
};

export default StatisticsPage;
