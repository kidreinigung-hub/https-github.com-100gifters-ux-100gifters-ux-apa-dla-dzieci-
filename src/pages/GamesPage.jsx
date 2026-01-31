import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GAME_CONFIGS } from '../data/gamesConfig';
import Card from '../components/common/Card';
import ButtonBig from '../components/common/ButtonBig';
import styles from './GamesPage.module.css';

export const GamesPage = () => {
  const { t } = useTranslation();
  const [selectedGame, setSelectedGame] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
  };

  const handlePlayGame = () => {
    if (selectedGame) {
      // Tutaj będzie logika do uruchomienia gry
      console.log(`Granie: ${selectedGame} na poziomie ${difficulty}`);
      setSelectedGame(null);
    }
  };

  const selectedGameConfig = GAME_CONFIGS.find(g => g.id === selectedGame);

  return (
    <div className={styles.gamesPage}>
      <h2 className={styles.title}>🎮 {t('games.title')}</h2>

      {selectedGame && selectedGameConfig ? (
        <div className={styles.gameDetails}>
          <div className={styles.detailsCard}>
            <h3 className={styles.gameName}>
              {selectedGameConfig.name[navigator.language] ||
                selectedGameConfig.name['en']}
            </h3>
            <p className={styles.gameDescription}>
              {selectedGameConfig.description[navigator.language] ||
                selectedGameConfig.description['en']}
            </p>

            <div className={styles.difficultySelector}>
              <label className={styles.difficultyLabel}>
                {t('settings.difficulty')}:
              </label>
              <div className={styles.difficultyButtons}>
                {selectedGameConfig.difficulty.map((diff) => (
                  <button
                    key={diff}
                    className={`${styles.diffButton} ${
                      difficulty === diff ? styles.active : ''
                    }`}
                    onClick={() => setDifficulty(diff)}
                  >
                    {t(`settings.${diff}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <ButtonBig
                variant="success"
                onClick={handlePlayGame}
              >
                ▶️ {t('button.start')}
              </ButtonBig>
              <ButtonBig
                variant="neutral"
                onClick={() => setSelectedGame(null)}
              >
                ← {t('button.back')}
              </ButtonBig>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.gamesList}>
          {GAME_CONFIGS.map((game) => (
            <div
              key={game.id}
              className={styles.gameCard}
              onClick={() => handleGameSelect(game.id)}
            >
              <Card
                title={
                  game.name[navigator.language] || game.name['en']
                }
                description={game.category}
                interactive={true}
              />
            </div>
          ))}
        </div>
      )}

      <div className={styles.info}>
        <p className={styles.infoText}>
          20 różnych gier edukacyjnych dla Ciebie! 🎉
        </p>
      </div>
    </div>
  );
};

export default GamesPage;
