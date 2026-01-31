import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import { speakText } from '../../utils/helpers';
import styles from './BackgroundColor.module.css';

/**
 * Background Color Game - Touch/click to change background color
 * Educational and sensory engagement - learn color names
 */
const BackgroundColor = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const colors = [
    { hex: '#E8D5E8', name: { pl: 'Fiolet', en: 'Purple', de: 'Violett' } },
    { hex: '#D5E8E8', name: { pl: 'Błękit', en: 'Cyan', de: 'Cyan' } },
    { hex: '#D5E8D5', name: { pl: 'Zieleń', en: 'Green', de: 'Grün' } },
    { hex: '#E8E8D5', name: { pl: 'Żółty', en: 'Yellow', de: 'Gelb' } },
    { hex: '#E8D5D5', name: { pl: 'Różowy', en: 'Pink', de: 'Rosa' } },
    { hex: '#FFB6C1', name: { pl: 'Jasnoróżowy', en: 'Light Pink', de: 'Hellrosa' } },
    { hex: '#87CEEB', name: { pl: 'Błękitny', en: 'Sky Blue', de: 'Himmelblau' } },
    { hex: '#90EE90', name: { pl: 'Jasna Zieleń', en: 'Light Green', de: 'Hellgrün' } }
  ];
  
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [lastColorSpoken, setLastColorSpoken] = useState(false);
  
  const gameDuration = { easy: 45, medium: 60, hard: 90 }[difficulty] || 45;
  const currentColor = colors[currentColorIndex];
  
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
  
  // Speak color name when changed
  useEffect(() => {
    if (accessibility.soundEnabled && isGameActive) {
      speakText(currentColor.name[language] || currentColor.name.en, language);
    }
  }, [currentColorIndex, accessibility.soundEnabled, language, isGameActive]);
  
  const handleColorChange = () => {
    if (!isGameActive) return;
    
    const newIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(newIndex);
    
    const newScore = score + 10;
    setScore(newScore);
    updateScore(10);
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'background_color',
      difficulty,
      score: score,
      colorChanges: score / 10,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, colorChanges: score / 10, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  const colorNameText = currentColor.name[language] || currentColor.name.en;
  
  return (
    <div
      className={`${styles.backgroundColor} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}
      style={{ backgroundColor: currentColor.hex }}
      onClick={handleColorChange}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleColorChange();
        }
      }}
      aria-label={`Background color: ${colorNameText}`}
    >
      {/* Floating stats */}
      <div className={styles.floatingStats}>
        <div className={styles.colorName}>
          <h1>{colorNameText}</h1>
          <p className={styles.colorHex}>{currentColor.hex}</p>
        </div>
        
        <div className={styles.gameStats}>
          <div className={styles.statCard}>
            <span className={styles.label}>🎨 Kliknięcia:</span>
            <span className={styles.value}>{score / 10}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.label}>⏱️ Czas:</span>
            <span className={styles.value}>{timeDisplay}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.label}>🎯 Wynik:</span>
            <span className={styles.value}>{score}</span>
          </div>
        </div>
      </div>
      
      {/* Center instruction */}
      {score === 0 && (
        <div className={styles.instruction}>
          <p>👆 Klikaj Wszędzie!</p>
          <p>Zmień Kolory</p>
        </div>
      )}
      
      {/* Bottom quit button */}
      {isGameActive && (
        <div className={styles.quitButton}>
          <ButtonBig 
            onClick={(e) => {
              e.stopPropagation();
              handleQuit();
            }}
            variant="danger"
            size="small"
          >
            Zakończ
          </ButtonBig>
        </div>
      )}
      
      {/* Game Over Modal */}
      {!isGameActive && (
        <div className={styles.gameOverModal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.gameOverCard}>
            <h2>🌈 Gra Skończona!</h2>
            <p>Zmieniono kolorów: <strong>{score / 10}</strong></p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>Świetnie Ci Poszło! 🎉</p>
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

export default BackgroundColor;
