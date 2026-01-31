import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './VirtualPiano.module.css';

/**
 * Virtual Piano Game - Colorful keys that play sounds
 * Great for musical exploration and fine motor skills
 */
const VirtualPiano = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const keys = [
    { note: 'C', color: '#E8D5E8', freq: 262 },
    { note: 'D', color: '#D5E8E8', freq: 294 },
    { note: 'E', color: '#D5E8D5', freq: 330 },
    { note: 'F', color: '#E8E8D5', freq: 349 },
    { note: 'G', color: '#E8D5D5', freq: 392 },
    { note: 'A', color: '#FFB6C1', freq: 440 },
    { note: 'B', color: '#87CEEB', freq: 494 },
  ];
  
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [keyPressed, setKeyPressed] = useState(null);
  const [keyCount, setKeyCount] = useState(0);
  
  const gameDuration = { easy: 120, medium: 180, hard: 240 }[difficulty] || 120;
  
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
  
  const playNote = (key) => {
    if (!isGameActive) return;
    
    // Visual feedback
    setKeyPressed(key.note);
    setTimeout(() => setKeyPressed(null), 150);
    
    // Audio feedback
    if (accessibility.soundEnabled) {
      playTone(key.freq, 0.3);
    }
    
    // Score
    const newScore = score + 10;
    setScore(newScore);
    setKeyCount(keyCount + 1);
  };
  
  const playTone = (freq, duration) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3 * (accessibility.soundVolume || 1), now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    osc.start(now);
    osc.stop(now + duration);
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'virtual_piano',
      difficulty,
      score: score,
      keyCount: keyCount,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, keyCount, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div className={`${styles.virtualPiano} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>🎹 Kliknięcia:</span>
          <span className={styles.value}>{keyCount}</span>
        </div>
        <div className={styles.statBox}>
          <span>🎵 Wynik:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span>⏱️ Czas:</span>
          <span className={styles.value}>{timeDisplay}</span>
        </div>
      </div>
      
      {/* Game Area */}
      <div className={styles.gameArea}>
        <h2 className={styles.title}>🎹 Graj na Pianinie! 🎹</h2>
        
        {/* Piano Keys */}
        <div className={styles.pianoContainer}>
          <div className={styles.keysWrapper}>
            {keys.map(key => (
              <button
                key={key.note}
                className={`${styles.pianoKey} ${keyPressed === key.note ? styles.pressed : ''}`}
                style={{ backgroundColor: key.color }}
                onClick={() => playNote(key)}
                disabled={!isGameActive}
                aria-label={`Key ${key.note}`}
              >
                <span className={styles.keyLabel}>{key.note}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Instructions */}
        {keyCount < 3 && (
          <p className={styles.instruction}>
            👉 Klikaj w klawisze i słuchaj dźwięków!
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
            <h2>🎵 Zabawy Muzyczne Skończone!</h2>
            <p>Zagrałeś: <strong>{keyCount}</strong> not</p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>Świetny Muzyk! 🎼</p>
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

export default VirtualPiano;
