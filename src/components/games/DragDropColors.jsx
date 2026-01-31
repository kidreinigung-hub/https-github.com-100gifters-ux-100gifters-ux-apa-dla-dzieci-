import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './DragDropColors.module.css';

/**
 * Drag & Drop Colors Game - Drag colored circles to matching colored squares
 * Great for color recognition and motor skills
 */
const DragDropColors = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const colors = [
    { hex: '#E8D5E8', name: { pl: 'Fiolet', en: 'Purple', de: 'Violett' } },
    { hex: '#D5E8E8', name: { pl: 'Błękit', en: 'Cyan', de: 'Cyan' } },
    { hex: '#D5E8D5', name: { pl: 'Zieleń', en: 'Green', de: 'Grün' } },
    { hex: '#E8E8D5', name: { pl: 'Żółty', en: 'Yellow', de: 'Gelb' } },
    { hex: '#E8D5D5', name: { pl: 'Różowy', en: 'Pink', de: 'Rosa' } },
  ];
  
  const itemCounts = { easy: 3, medium: 4, hard: 5 }[difficulty] || 3;
  
  const [draggableItems, setDraggableItems] = useState([]);
  const [dropZones, setDropZones] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);
  
  const gameDuration = { easy: 60, medium: 90, hard: 120 }[difficulty] || 60;
  
  // Initialize game
  useEffect(() => {
    const selectedColors = colors.slice(0, itemCounts);
    
    const items = selectedColors.map((color, idx) => ({
      id: `item-${idx}`,
      colorId: idx,
      color: color.hex,
      matched: false,
      position: { x: 10 + idx * 15, y: 20 }
    }));
    
    const zones = selectedColors.map((color, idx) => ({
      id: `zone-${idx}`,
      colorId: idx,
      color: color.hex,
      matched: false,
      position: { x: 10 + idx * 15, y: 60 }
    }));
    
    setDraggableItems(items);
    setDropZones(zones);
  }, [difficulty]);
  
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
  
  const handleDrop = (zone) => {
    if (!draggedItem) return;
    
    if (draggedItem.colorId === zone.colorId && !matched.includes(draggedItem.id)) {
      // Correct match!
      const newMatched = [...matched, draggedItem.id, zone.id];
      setMatched(newMatched);
      
      const newScore = score + 50;
      setScore(newScore);
      updateScore(50);
      
      // Check if all matched
      if (newMatched.length === itemCounts * 2) {
        setIsGameActive(false);
        handleGameEnd();
      }
    }
    
    setDraggedItem(null);
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'drag_drop_colors',
      difficulty,
      score: score,
      matched: matched.length / 2,
      isCorrect: matched.length === itemCounts * 2
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
    <div className={`${styles.dragDropColors} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>🎨 Dopasowane:</span>
          <span className={styles.value}>{matched.length / 2}/{itemCounts}</span>
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
        {/* Top - Draggable Items */}
        <div className={styles.section}>
          <h3>Przeciągnij kolory do dołu:</h3>
          <div className={styles.itemsContainer}>
            {draggableItems.map(item => (
              <div
                key={item.id}
                className={`${styles.draggableItem} ${matched.includes(item.id) ? styles.matched : ''}`}
                style={{ backgroundColor: item.color }}
                draggable={!matched.includes(item.id)}
                onDragStart={() => handleDragStart(item)}
                role="button"
                aria-label={`Drag color`}
              >
                <span className={styles.circle}>●</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom - Drop Zones */}
        <div className={styles.section}>
          <h3>Dopasuj do tych kwadratów:</h3>
          <div className={styles.dropZonesContainer}>
            {dropZones.map(zone => (
              <div
                key={zone.id}
                className={`${styles.dropZone} ${matched.includes(zone.id) ? styles.matched : ''}`}
                style={{ 
                  borderColor: zone.color,
                  backgroundColor: matched.includes(zone.id) ? zone.color + '33' : 'transparent'
                }}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(zone)}
                role="region"
                aria-label={`Drop zone for color`}
              >
                <div className={styles.innerSquare} style={{ backgroundColor: zone.color }}>
                  {matched.includes(zone.id) && <span className={styles.checkmark}>✓</span>}
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
            <p>Dopasowane pary: <strong>{matched.length / 2}/{itemCounts}</strong></p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>
              {matched.length === itemCounts * 2 ? 'Doskonale! Wszystkie dopasowane! 🌟' : 'Niezła próba! 💪'}
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

export default DragDropColors;
