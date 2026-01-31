import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './CountingGame.module.css';

const CountingGame = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const gameDurations = { easy: 60, medium: 90, hard: 120 };
  const itemCounts = { easy: 5, medium: 8, hard: 12 };

  const [displayItems, setDisplayItems] = useState([]);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(gameDurations[difficulty]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [feedback, setFeedback] = useState('');

  const items = ['🍎', '🍊', '🍓', '🌟', '🎈'];

  // Generate items on start
  useEffect(() => {
    generateItems();
  }, [difficulty]);

  const generateItems = () => {
    const itemCount = Math.floor(Math.random() * itemCounts[difficulty]) + 2;
    const newItems = [];
    for (let i = 0; i < itemCount; i++) {
      newItems.push({
        id: i,
        emoji: items[Math.floor(Math.random() * items.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
      });
    }
    setDisplayItems(newItems);
    setCount(0);
  };

  // Game timer
  useEffect(() => {
    if (!isGameActive) return;
    
    const interval = setInterval(() => {
      setGameTime(t => {
        if (t <= 1) {
          setIsGameActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isGameActive]);

  const handleItemClick = (item) => {
    if (!isGameActive) return;
    
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount === displayItems.length) {
      setScore(s => s + 50);
      updateScore(50);
      setFeedback('✓ Dobrze policzyłeś!');
      
      setTimeout(() => {
        generateItems();
        setFeedback('');
      }, 1500);
    }
  };

  const handleQuit = () => {
    setIsGameActive(false);
    recordGameSession({
      gameId: 'counting_game',
      difficulty,
      score,
      itemsCompleted: Math.floor(score / 50),
    });
  };

  return (
    <div className={styles.countingContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Liczba:</span>
          <span className={styles.value}>{count}/{displayItems.length}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Czas:</span>
          <span className={styles.value}>{gameTime}s</span>
        </div>
        <button onClick={handleQuit} className={styles.quitButton}>✕</button>
      </div>

      <div className={styles.gameArea}>
        <div className={styles.instruction}>
          Kliknij na wszystkie przedmioty i je policz!
        </div>

        <div className={styles.itemsContainer}>
          {displayItems.map((item) => (
            <button
              key={item.id}
              className={styles.itemButton}
              onClick={() => handleItemClick(item)}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        {feedback && <div className={styles.feedback}>{feedback}</div>}
      </div>

      {!isGameActive && (
        <div className={styles.gameOverModal}>
          <div className={styles.modalContent}>
            <h2>Koniec!</h2>
            <p>Punkty: {score}</p>
            <p>Policzyłeś {Math.floor(score / 50)} zestawów!</p>
            <button onClick={() => window.location.reload()} className={styles.replayButton}>
              Graj jeszcze raz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountingGame;
