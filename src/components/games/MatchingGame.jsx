import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import { getRandomItems, shuffleArray, playSound } from '../../utils/helpers';
import { WORDS_DATABASE } from '../../data/wordsBase';
import styles from './MatchingGame.module.css';

/**
 * Gra Dopasowywania - połącz słowo z obrazkiem
 */
export const MatchingGame = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language, recordGameSession } = useAppStore();
  const { updateScore } = useGameStore();

  const [pairs, setPairs] = useState([]);
  const [matched, setMatched] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const difficultyConfig = {
    easy: 3,
    medium: 5,
    hard: 8
  };

  const pairsCount = difficultyConfig[difficulty];

  // Inicjacja gry
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const words = getRandomItems(WORDS_DATABASE, pairsCount);
    
    const leftSide = words.map((w, idx) => ({
      id: `left-${idx}`,
      wordId: w.id,
      text: w.translations[language] || w.translations['en'],
      side: 'left'
    }));

    const rightSide = words.map((w, idx) => ({
      id: `right-${idx}`,
      wordId: w.id,
      image: w.image,
      side: 'right'
    }));

    setPairs({
      left: leftSide,
      right: shuffleArray(rightSide)
    });
    setMatched([]);
    setSelected(null);
    setScore(0);
  };

  const handleSelect = (item) => {
    if (matched.some((m) => m === item.id)) return;

    if (!selected) {
      setSelected(item);
    } else if (selected.id === item.id) {
      setSelected(null);
    } else if (selected.wordId === item.wordId) {
      // Match!
      const newMatched = [...matched, selected.id, item.id];
      setMatched(newMatched);
      setSelected(null);
      const newScore = score + 10;
      setScore(newScore);
      updateScore(10);

      if (accessibility.soundEnabled) {
        playSound('success');
      }

      // Sprawdź koniec gry
      if (newMatched.length === pairsCount * 2) {
        setTimeout(() => {
          handleGameEnd(true);
        }, 500);
      }
    } else {
      // Brak pary
      setSelected(item);
      if (accessibility.soundEnabled) {
        playSound('error');
      }
    }
  };

  const handleGameEnd = (success) => {
    recordGameSession({
      gameId: 'matching_game',
      difficulty,
      score,
      isCorrect: success
    });
    onGameEnd?.({ success, score });
  };

  if (!pairs.left) return null;

  return (
    <div className={styles.matchingGame}>
      <div className={styles.header}>
        <h3 className={styles.title}>Dopasuj słowa z obrazkami</h3>
        <div className={styles.scoreBoard}>
          <span className={styles.scoreLabel}>Punkty:</span>
          <span className={styles.scoreValue}>{score}</span>
        </div>
      </div>

      <div className={styles.board}>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Słowa</h4>
          <div className={styles.itemsList}>
            {pairs.left.map((item) => (
              <button
                key={item.id}
                className={`${styles.item} ${
                  selected?.id === item.id ? styles.selected : ''
                } ${matched.includes(item.id) ? styles.matched : ''}`}
                onClick={() => handleSelect(item)}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Obrazki</h4>
          <div className={styles.itemsList}>
            {pairs.right.map((item) => (
              <button
                key={item.id}
                className={`${styles.item} ${styles.image} ${
                  selected?.id === item.id ? styles.selected : ''
                } ${matched.includes(item.id) ? styles.matched : ''}`}
                onClick={() => handleSelect(item)}
              >
                {item.image ? (
                  <img src={item.image} alt="Obrazek" />
                ) : (
                  <span>🖼️</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
