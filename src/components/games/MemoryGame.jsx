import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import { getRandomItems, delay, playSound } from '../../utils/helpers';
import { WORDS_DATABASE, WORD_CATEGORIES, getWordsByCategory } from '../../data/wordsBase';
import styles from './MemoryGame.module.css';

/**
 * Gra Memoria - classic memory/concentration game
 */
export const MemoryGame = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language, recordGameSession } = useAppStore();
  const { updateScore, updateMistakes } = useGameStore();

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Ustawienia trudności
  const difficultyConfig = {
    easy: { pairsCount: 4, displayTime: 3000 },
    medium: { pairsCount: 8, displayTime: 2000 },
    hard: { pairsCount: 12, displayTime: 1000 }
  };

  const config = difficultyConfig[difficulty];

  // Inicjacja gry
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = async () => {
    // Pobierz losowe słowa
    const words = getRandomItems(WORDS_DATABASE, config.pairsCount);
    
    // Stwórz karty (każde słowo ma duplikat)
    const gameCards = [];
    words.forEach((word, idx) => {
      gameCards.push({
        id: `${word.id}-1`,
        wordId: word.id,
        text: word.translations[language] || word.translations['en'],
        image: word.image,
        index: gameCards.length
      });
      gameCards.push({
        id: `${word.id}-2`,
        wordId: word.id,
        text: word.translations[language] || word.translations['en'],
        image: word.image,
        index: gameCards.length
      });
    });

    // Potasuj karty
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped(new Array(shuffled.length).fill(false));
    setMatched(new Array(shuffled.length).fill(false));
  };

  const handleCardClick = async (index) => {
    if (isProcessing || flipped[index] || matched[index]) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    if (accessibility.soundEnabled) {
      playSound('flip');
    }

    // Sprawdź czy to druga karta
    const flippedIndices = newFlipped
      .map((f, i) => f && !matched[i] ? i : null)
      .filter(i => i !== null);

    if (flippedIndices.length === 2) {
      setIsProcessing(true);
      setMoves(moves + 1);

      const [first, second] = flippedIndices;

      // Sprawdź czy to para
      if (cards[first].wordId === cards[second].wordId) {
        // MATCH!
        await delay(500);
        const newMatched = [...matched];
        newMatched[first] = true;
        newMatched[second] = true;
        setMatched(newMatched);

        if (accessibility.soundEnabled) {
          playSound('success');
        }

        updateScore(10);

        // Sprawdź koniec gry
        if (newMatched.every((m) => m)) {
          setTimeout(() => {
            handleGameEnd(true);
          }, 500);
        }
      } else {
        // Brak pary
        await delay(1000);
        const resetFlipped = [...flipped];
        resetFlipped[first] = false;
        resetFlipped[second] = false;
        setFlipped(resetFlipped);

        if (accessibility.soundEnabled) {
          playSound('error');
        }

        updateMistakes(1);
      }

      setIsProcessing(false);
    }
  };

  const handleGameEnd = (success) => {
    recordGameSession({
      gameId: 'memory_game',
      difficulty,
      moves,
      matched: matched.filter((m) => m).length,
      score: matched.filter((m) => m).length * 10,
      isCorrect: success
    });

    onGameEnd?.({
      success,
      score: matched.filter((m) => m).length * 10,
      moves
    });
  };

  return (
    <div className={styles.memoryGame}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>Ruchy:</span>
            <span className={styles.value}>{moves}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Pary:</span>
            <span className={styles.value}>
              {matched.filter((m) => m).length} / {config.pairsCount}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.board}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              flipped[index] || matched[index] ? styles.flipped : ''
            } ${matched[index] ? styles.matched : ''}`}
            onClick={() => handleCardClick(index)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) =>
              (e.key === 'Enter' || e.key === ' ') && handleCardClick(index)
            }
            aria-label={`Karta ${index + 1}`}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <span className={styles.cardIcon}>?</span>
              </div>
              <div className={styles.cardBack}>
                {card.image ? (
                  <img src={card.image} alt={card.text} />
                ) : (
                  <span className={styles.cardText}>{card.text}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
