import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './MemoryPhotos.module.css';

/**
 * Memory Photos Game - Traditional memory game with family photos
 * Creates emotional connection while teaching memory skills
 */
const MemoryPhotos = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  // Mock family photos (in real app these would be user's actual photos)
  const photos = [
    { id: 1, emoji: '👨‍👩‍👧‍👦', name: { pl: 'Rodzina', en: 'Family', de: 'Familie' } },
    { id: 2, emoji: '🏠', name: { pl: 'Dom', en: 'House', de: 'Haus' } },
    { id: 3, emoji: '🧸', name: { pl: 'Miś', en: 'Teddy', de: 'Teddy' } },
    { id: 4, emoji: '🎮', name: { pl: 'Gra', en: 'Game', de: 'Spiel' } },
    { id: 5, emoji: '🌳', name: { pl: 'Park', en: 'Park', de: 'Park' } },
  ];
  
  const pairCounts = { easy: 3, medium: 4, hard: 5 }[difficulty] || 3;
  
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  
  const gameDuration = { easy: 120, medium: 180, hard: 240 }[difficulty] || 120;
  
  // Initialize game
  useEffect(() => {
    const selectedPhotos = photos.slice(0, pairCounts);
    const cardPairs = [...selectedPhotos, ...selectedPhotos];
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    
    const gameCards = shuffled.map((photo, idx) => ({
      id: idx,
      photoId: photo.id,
      emoji: photo.emoji,
      name: photo.name
    }));
    
    setCards(gameCards);
  }, [difficulty, pairCounts]);
  
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
  
  // Handle card clicks
  const handleCardClick = (idx) => {
    if (!isGameActive || flipped.includes(idx) || selectedCards.includes(idx)) return;
    if (selectedCards.length >= 2) return;
    
    const newFlipped = [...flipped, idx];
    const newSelectedCards = [...selectedCards, idx];
    
    setFlipped(newFlipped);
    setSelectedCards(newSelectedCards);
    
    if (newSelectedCards.length === 2) {
      setMoves(moves + 1);
      
      const card1 = cards[newSelectedCards[0]];
      const card2 = cards[newSelectedCards[1]];
      
      if (card1.photoId === card2.photoId) {
        // Match!
        setMatched([...matched, card1.photoId]);
        setScore(score + 50);
        updateScore(50);
        setSelectedCards([]);
        
        if (matched.length + 1 === pairCounts) {
          setIsGameActive(false);
          handleGameEnd();
        }
      } else {
        // No match - flip back
        setTimeout(() => {
          setFlipped(newFlipped.filter(f => !newSelectedCards.includes(f)));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'memory_photos',
      difficulty,
      score: score,
      moves: moves,
      matched: matched.length,
      isCorrect: matched.length === pairCounts
    });
    
    if (onGameEnd) {
      onGameEnd({ score, moves, matched: matched.length, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div className={`${styles.memoryPhotos} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>💚 Dopasowane:</span>
          <span className={styles.value}>{matched.length}/{pairCounts}</span>
        </div>
        <div className={styles.statBox}>
          <span>🎯 Ruchy:</span>
          <span className={styles.value}>{moves}</span>
        </div>
        <div className={styles.statBox}>
          <span>🏆 Wynik:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span>⏱️ Czas:</span>
          <span className={styles.value}>{timeDisplay}</span>
        </div>
      </div>
      
      {/* Game Area */}
      <div className={styles.gameArea}>
        <h2 className={styles.title}>💞 Pamięć Rodzinna 💞</h2>
        
        <div className={styles.cardGrid}>
          {cards.map((card, idx) => (
            <button
              key={idx}
              className={`${styles.card} ${flipped.includes(idx) ? styles.flipped : ''} ${matched.includes(card.photoId) ? styles.matched : ''}`}
              onClick={() => handleCardClick(idx)}
              disabled={!isGameActive || matched.includes(card.photoId) || selectedCards.includes(idx)}
              aria-label={`Card ${idx + 1}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <span>?</span>
                </div>
                <div className={styles.cardBack}>
                  <span>{card.emoji}</span>
                </div>
              </div>
            </button>
          ))}
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
            <p>Dopasowane pary: <strong>{matched.length}/{pairCounts}</strong></p>
            <p>Ruchy: <strong>{moves}</strong></p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>
              {matched.length === pairCounts ? 'Świetna Pamięć! 💚' : 'Dobra próba! 💪'}
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

export default MemoryPhotos;
