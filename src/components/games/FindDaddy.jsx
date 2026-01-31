import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './FindDaddy.module.css';

const FindDaddy = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const roomItems = [
    { id: 1, emoji: '👔', name: 'Krawat', color: '#FF6B6B' },
    { id: 2, emoji: '📚', name: 'Książka', color: '#4ECDC4' },
    { id: 3, emoji: '☕', name: 'Kawa', color: '#FFE66D' },
    { id: 4, emoji: '👓', name: 'Okulary', color: '#A8E6CF' },
    { id: 5, emoji: '⌚', name: 'Zegarek', color: '#C7CEEA' },
    { id: 6, emoji: '🎧', name: 'Słuchawki', color: '#FFDAB9' },
    { id: 7, emoji: '📱', name: 'Telefon', color: '#FFB6C1' },
    { id: 8, emoji: '🕯️', name: 'Świeca', color: '#FFD700' },
  ];

  const itemCounts = { easy: 4, medium: 6, hard: 8 };

  const [roomItemsSelected, setRoomItemsSelected] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [found, setFound] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const count = itemCounts[difficulty];
    const selected = roomItems.slice(0, count);
    setRoomItemsSelected(selected);
  }, [difficulty]);

  const handleItemClick = (item, index) => {
    if (found || revealed.includes(index)) return;

    setAttempts(a => a + 1);
    const newRevealed = [...revealed, index];
    setRevealed(newRevealed);

    if (item.id === 1) {
      // Found dad's object (first item)
      setFound(true);
      setScore(s => s + 500);
      updateScore(500);
      recordGameSession({
        gameId: 'find_daddy',
        difficulty,
        score: 500,
        foundIn: newRevealed.length,
        attempts,
      });
    } else {
      setScore(s => s + 10);
      updateScore(10);
    }
  };

  return (
    <div className={styles.findDaddyContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Próby:</span>
          <span className={styles.value}>{attempts}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <h2 className={styles.title}>Gdzie jest Tata? 👨</h2>
        <p className={styles.instruction}>
          {found ? '🎉 Znalazłeś! Gratulacje!' : 'Kliknij na przedmioty - szukaj krawata tatusia!'}
        </p>

        <div className={styles.roomItems}>
          {roomItemsSelected.map((item, index) => (
            <button
              key={index}
              className={`${styles.roomItem} ${revealed.includes(index) ? styles.revealed : ''}`}
              onClick={() => handleItemClick(item, index)}
              disabled={found || revealed.includes(index)}
              style={{
                backgroundColor: revealed.includes(index) ? item.color : '#ccc',
              }}
            >
              {revealed.includes(index) && <span className={styles.emoji}>{item.emoji}</span>}
              {!revealed.includes(index) && <span className={styles.question}>?</span>}
            </button>
          ))}
        </div>

        {found && (
          <div className={styles.successMessage}>
            <div className={styles.celebration}>🎉</div>
            <p>Znalazłeś krawat tatusia!</p>
            <button onClick={() => window.location.reload()} className={styles.replayButton}>
              Szukaj jeszcze raz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDaddy;
