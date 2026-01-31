import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './ShadowMatch.module.css';

/**
 * Shadow Match Game - Drag objects to their matching shadows
 * Great for shape recognition and spatial reasoning
 */
const ShadowMatch = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const items = { easy: 3, medium: 4, hard: 5 }[difficulty] || 3;
  
  const itemShapes = [
    { emoji: '🎈', shadow: '●' },
    { emoji: '🎨', shadow: '■' },
    { emoji: '🏠', shadow: '⬛' },
    { emoji: '☀️', shadow: '◉' },
    { emoji: '🌳', shadow: '▲' }
  ];
  
  const [gameItems, setGameItems] = useState([]);
  const [shadows, setShadows] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);
  
  const gameDuration = { easy: 60, medium: 90, hard: 120 }[difficulty] || 60;
  
  // Initialize game
  useEffect(() => {
    const selectedItems = itemShapes.slice(0, items);
    const shuffledShadows = [...selectedItems].sort(() => Math.random() - 0.5);
    
    const gameItemsList = selectedItems.map((item, idx) => ({
      id: `item-${idx}`,
      itemId: idx,
      ...item,
      x: 10 + (idx % 3) * 25,
      y: 15
    }));
    
    const shadowsList = shuffledShadows.map((item, idx) => ({
      id: `shadow-${idx}`,
      itemId: itemShapes.indexOf(item),
      ...item,
      x: 10 + (idx % 3) * 25,
      y: 65
    }));
    
    setGameItems(gameItemsList);
    setShadows(shadowsList);
  }, [difficulty, items]);
  
  // Game timer
  useEffect(() => {
    if (!isGameActive) return;
    
    const timer = setInterval(() => {
      setGameTime(prev => {
        const newTime = prev + 1;
        if (newTime >= gameDuration) {
          setIsGameActive(false);
          handleGameEnd();
          return gameDuration;
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isGameActive, gameDuration]);
  
  const handleDragStart = (item) => {
    if (matched.includes(item.id)) return;
    setDraggedItem(item);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (shadow) => {
    if (!draggedItem) return;
    
    if (draggedItem.itemId === shadow.itemId && !matched.includes(draggedItem.id)) {
      const newMatched = [...matched, draggedItem.id, shadow.id];
      setMatched(newMatched);
      
      const newScore = score + 50;
      setScore(newScore);
      updateScore(50);
      
      if (newMatched.length === items * 2) {
        setIsGameActive(false);
        handleGameEnd();
      }
    }
    
    setDraggedItem(null);
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'shadow_match',
      difficulty,
      score: score,
      matched: matched.length / 2,
      isCorrect: matched.length === items * 2
    });
    
    if (onGameEnd) {
      onGameEnd({ score, matched: matched.length / 2, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div className={`${styles.shadowMatch} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>⬛ Dopasowane:</span>
          <span className={styles.value}>{matched.length / 2}/{items}</span>
        </div>
        <div className={styles.statBox}>
          <span>🎯 Wynik:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span>⏱️ Czas:</span>
          <span className={styles.value}>{timeDisplay}</span>
        </div>
      </div>
      
      {/* Game Area */}
      <div className={styles.gameArea}>
        {/* Top - Items to drag */}
        <div className={styles.section}>
          <h3>Przeciągnij te przedmioty:</h3>
          <div className={styles.itemsContainer}>
            {gameItems.map(item => (
              <div
                key={item.id}
                className={`${styles.draggableItem} ${matched.includes(item.id) ? styles.matched : ''}`}
                draggable={!matched.includes(item.id)}
                onDragStart={() => handleDragStart(item)}
              >
                <span className={styles.emoji}>{item.emoji}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom - Shadows */}
        <div className={styles.section}>
          <h3>Do ich cieni:</h3>
          <div className={styles.shadowsContainer}>
            {shadows.map(shadow => (
              <div
                key={shadow.id}
                className={`${styles.dropZone} ${matched.includes(shadow.id) ? styles.matched : ''}`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(shadow)}
              >
                <div className={styles.shadow}>
                  <span>{shadow.shadow}</span>
                  {matched.includes(shadow.id) && <span className={styles.checkmark}>✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quit button */}
      {isGameActive && (
        <div className={styles.quitButton}>
          <ButtonBig 
            onClick={handleQuit}
            variant="danger"
            size="small"
          >
            Zakończ
          </ButtonBig>
        </div>
      )}
      
      {/* Game Over Modal */}
      {!isGameActive && (
        <div className={styles.gameOverModal}>
          <div className={styles.gameOverCard}>
            <h2>🎉 Gra Skończona!</h2>
            <p>Dopasowane cienie: <strong>{matched.length / 2}/{items}</strong></p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>
              {matched.length === items * 2 ? 'Doskonale! 🌟' : 'Świetnie Ci poszło! 💪'}
            </p>
            <ButtonBig 
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Graj Jeszcze Raz
            </ButtonBig>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShadowMatch;
