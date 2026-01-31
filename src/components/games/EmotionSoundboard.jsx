import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import { speakText } from '../../utils/helpers';
import styles from './EmotionSoundboard.module.css';

/**
 * Emotion Soundboard - Click emotion faces to learn emotion words
 * Great for emotional awareness and vocabulary
 */
const EmotionSoundboard = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const emotions = [
    { emoji: '😊', name: { pl: 'Szczęśliwy', en: 'Happy', de: 'Glücklich' } },
    { emoji: '😢', name: { pl: 'Smutny', en: 'Sad', de: 'Traurig' } },
    { emoji: '😡', name: { pl: 'Zły', en: 'Angry', de: 'Wütend' } },
    { emoji: '😨', name: { pl: 'Zstraszony', en: 'Scared', de: 'Verängstigt' } },
    { emoji: '😴', name: { pl: 'Zmęczony', en: 'Tired', de: 'Müde' } },
    { emoji: '🤗', name: { pl: 'Kochający', en: 'Loving', de: 'Liebevoll' } },
  ];
  
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  
  const gameDuration = { easy: 60, medium: 90, hard: 120 }[difficulty] || 60;
  
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
  
  const handleEmotionClick = (emotion) => {
    if (!isGameActive) return;
    
    setSelectedEmotion(emotion.emoji);
    setTimeout(() => setSelectedEmotion(null), 300);
    
    const emotionName = emotion.name[language] || emotion.name.en;
    
    if (accessibility.soundEnabled) {
      speakText(emotionName, language);
    }
    
    const newScore = score + 20;
    setScore(newScore);
    updateScore(20);
    setClickCount(clickCount + 1);
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'emotion_soundboard',
      difficulty,
      score: score,
      emotionClicks: clickCount,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, emotionClicks: clickCount, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div className={`${styles.emotionSoundboard} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>😊 Kliknięcia:</span>
          <span className={styles.value}>{clickCount}</span>
        </div>
        <div className={styles.statBox}>
          <span>💯 Wynik:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span>⏱️ Czas:</span>
          <span className={styles.value}>{timeDisplay}</span>
        </div>
      </div>
      
      {/* Game Area */}
      <div className={styles.gameArea}>
        <h2 className={styles.title}>😊 Emocje i Uczucia 😊</h2>
        
        {/* Emotion Grid */}
        <div className={styles.emotionGrid}>
          {emotions.map((emotion, idx) => (
            <button
              key={idx}
              className={`${styles.emotionButton} ${selectedEmotion === emotion.emoji ? styles.selected : ''}`}
              onClick={() => handleEmotionClick(emotion)}
              disabled={!isGameActive}
              aria-label={emotion.name.en}
            >
              <span className={styles.emotionEmoji}>{emotion.emoji}</span>
              <span className={styles.emotionName}>
                {emotion.name[language] || emotion.name.en}
              </span>
            </button>
          ))}
        </div>
        
        {/* Instructions */}
        {clickCount < 3 && (
          <p className={styles.instruction}>
            👆 Klikaj w emocje i słuchaj ich nazw!
          </p>
        )}
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
            <h2>🎉 Lekcja Emocji Skończona!</h2>
            <p>Nauczyłeś się: <strong>{clickCount}</strong> emocji</p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>Świetnie! Rozumiesz Emocje! 💚</p>
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

export default EmotionSoundboard;
