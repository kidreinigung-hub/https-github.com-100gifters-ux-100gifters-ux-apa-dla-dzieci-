import React, { useState, useEffect, useRef } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './CursorFollower.module.css';

/**
 * Cursor Follower Game - An animal/character smoothly follows cursor/touch
 * Great for understanding cause-and-effect and tracking movement
 */
const CursorFollower = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const gameRef = useRef(null);
  const characterRef = useRef(null);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [touchCount, setTouchCount] = useState(0);
  
  const gameDuration = { easy: 60, medium: 90, hard: 120 }[difficulty] || 60;
  const character = '🐱'; // Cat emoji
  
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
  
  // Handle mouse/touch movement
  const handleMouseMove = (e) => {
    if (!isGameActive) return;
    
    const rect = gameRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    
    setTargetPosition({ x: newX, y: newY });
  };
  
  const handleTouchMove = (e) => {
    if (!isGameActive) return;
    
    const rect = gameRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const newX = touch.clientX - rect.left;
    const newY = touch.clientY - rect.top;
    
    setTargetPosition({ x: newX, y: newY });
    
    // Count touches for score
    if (touchCount % 5 === 0) {
      const newScore = score + 10;
      setScore(newScore);
      updateScore(10);
    }
    setTouchCount(prev => prev + 1);
  };
  
  // Smooth animation - character follows target
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setPosition(prev => {
        const speed = 0.08; // Smoothing factor
        const newX = prev.x + (targetPosition.x - prev.x) * speed;
        const newY = prev.y + (targetPosition.y - prev.y) * speed;
        
        return { x: newX, y: newY };
      });
    }, 1000 / 60); // 60 FPS
    
    return () => clearInterval(animationFrame);
  }, [targetPosition]);
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'cursor_follower',
      difficulty,
      score: score,
      touchCount: touchCount,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, touchCount, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div
      ref={gameRef}
      className={`${styles.cursorFollower} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Background gradient */}
      <svg className={styles.background} style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8D5E8" />
            <stop offset="100%" stopColor="#D5E8E8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
      </svg>
      
      {/* Header Stats */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>🐱 Pieszczocze:</span>
          <span className={styles.value}>{touchCount}</span>
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
      
      {/* Instruction when starting */}
      {score === 0 && touchCount < 5 && (
        <div className={styles.instruction}>
          <p>👆 Ruszaj myszką lub palcem!</p>
          <p>Kotek Cię będzie śledzić! 🐱</p>
        </div>
      )}
      
      {/* Character that follows cursor */}
      <div
        ref={characterRef}
        className={styles.character}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          fontSize: { easy: '60px', medium: '80px', hard: '100px' }[difficulty] || '60px'
        }}
        role="img"
        aria-label="Cat following your cursor"
      >
        {character}
      </div>
      
      {/* Trail effect (optional particles) */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            left: `${position.x + Math.cos(i * Math.PI / 1.5) * 20}px`,
            top: `${position.y + Math.sin(i * Math.PI / 1.5) * 20}px`,
            opacity: (3 - i) / 3 * 0.5,
            fontSize: `${(60 - i * 15)}px`
          }}
        >
          ✨
        </div>
      ))}
      
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
            <h2>🎉 Zabawy Skończona!</h2>
            <p>Kotka gaskała: <strong>{touchCount}</strong> razy</p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>Kotek Cię polubił! 🐱💕</p>
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

export default CursorFollower;
