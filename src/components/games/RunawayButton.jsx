import React, { useState, useEffect, useRef } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './RunawayButton.module.css';

/**
 * Runaway Button Game - Button escapes when you try to click it
 * Teaches coordination and cause-effect relationships
 */
const RunawayButton = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const containerRef = useRef(null);
  
  const [buttonPos, setButtonPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  
  const gameDuration = { easy: 30, medium: 45, hard: 60 }[difficulty] || 30;
  
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
  
  const generateNewPosition = () => {
    const padding = 10; // Percentage margin from edges
    const maxX = 100 - padding;
    const maxY = 100 - padding;
    
    return {
      x: padding + Math.random() * (maxX - padding),
      y: padding + Math.random() * (maxY - padding)
    };
  };
  
  const handleMouseEnter = () => {
    if (!isGameActive) return;
    
    setAttempts(prev => prev + 1);
    setHoverCount(prev => prev + 1);
    setButtonPos(generateNewPosition());
  };
  
  const handleButtonClick = (e) => {
    if (!isGameActive) return;
    
    e.preventDefault();
    setButtonPos(generateNewPosition());
    setAttempts(prev => prev + 1);
  };
  
  const handleSuccessClick = () => {
    if (!isGameActive) return;
    
    const newScore = score + 50;
    setScore(newScore);
    updateScore(50);
    setButtonPos(generateNewPosition());
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'runaway_button',
      difficulty,
      score: score,
      attempts: attempts,
      hoverCount: hoverCount,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, attempts, hoverCount, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  const colors = [
    '#E8D5E8',
    '#D5E8E8',
    '#D5E8D5',
    '#E8E8D5',
    '#E8D5D5'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div
      ref={containerRef}
      className={`${styles.runawayButton} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>🎯 Próby:</span>
          <span className={styles.value}>{attempts}</span>
        </div>
        <div className={styles.statBox}>
          <span>⏱️ Czas:</span>
          <span className={styles.value}>{timeDisplay}</span>
        </div>
        <div className={styles.statBox}>
          <span>🏆 Wynik:</span>
          <span className={styles.value}>{score}</span>
        </div>
      </div>
      
      {/* Instructions */}
      {attempts < 3 && (
        <div className={styles.instruction}>
          <p>👆 Spróbuj Złapać Przycisk!</p>
          <p>On Ucieka, ale możesz go złapać! 🏃</p>
        </div>
      )}
      
      {/* The Runaway Button */}
      <button
        className={styles.runawaybuttonElement}
        style={{
          left: `${buttonPos.x}%`,
          top: `${buttonPos.y}%`,
          backgroundColor: randomColor
        }}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
        onClick={handleButtonClick}
        disabled={!isGameActive}
        aria-label="Runaway button - try to catch it!"
      >
        <span className={styles.buttonText}>🎮</span>
      </button>
      
      {/* Optional success button that appears after attempts */}
      {attempts > 10 && score === 0 && (
        <div className={styles.helpButton}>
          <button
            className={styles.successButton}
            onClick={handleSuccessClick}
            disabled={!isGameActive}
            aria-label="Success button - click for points"
          >
            <span>💚</span>
            <p>Gratulacje!</p>
          </button>
        </div>
      )}
      
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
            <p>Próby: <strong>{attempts}</strong></p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>
              {score > 0 ? 'Udało Ci się! Świetnie! 🏆' : 'Spróbuj jeszcze raz! 💪'}
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

export default RunawayButton;
