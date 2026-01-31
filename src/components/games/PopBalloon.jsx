import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './PopBalloon.module.css';

/**
 * Pop Balloon Game - Kids click on balloons, balloons pop with sound
 * Great for sensory engagement and basic clicking skills
 */
const PopBalloon = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  
  // Game duration based on difficulty
  const gameDuration = { easy: 30, medium: 45, hard: 60 }[difficulty] || 30;
  
  // Initialize balloons
  useEffect(() => {
    const initialBalloons = generateBalloons(
      { easy: 5, medium: 8, hard: 12 }[difficulty] || 5
    );
    setBalloons(initialBalloons);
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
  
  // New balloons spawn periodically
  useEffect(() => {
    if (!isGameActive) return;
    
    const spawnTimer = setInterval(() => {
      setBalloons(prev => {
        const newBalloon = {
          id: Date.now(),
          top: Math.random() * 80,
          left: Math.random() * 90,
          size: 40 + Math.random() * 40,
          color: ['#E8D5E8', '#D5E8E8', '#D5E8D5', '#E8E8D5', '#E8D5D5'][
            Math.floor(Math.random() * 5)
          ],
          duration: 2 + Math.random() * 3
        };
        return [...prev, newBalloon];
      });
    }, 1000);
    
    return () => clearInterval(spawnTimer);
  }, [isGameActive]);
  
  // Remove balloons that float away
  useEffect(() => {
    const removeTimer = setInterval(() => {
      setBalloons(prev => 
        prev.filter(balloon => {
          const age = (Date.now() - parseInt(balloon.id)) / 1000;
          return age < balloon.duration;
        })
      );
    }, 500);
    
    return () => clearInterval(removeTimer);
  }, []);
  
  const generateBalloons = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      top: Math.random() * 80,
      left: Math.random() * 90,
      size: 40 + Math.random() * 40,
      color: ['#E8D5E8', '#D5E8E8', '#D5E8D5', '#E8E8D5', '#E8D5D5'][i % 5],
      duration: 2 + Math.random() * 3
    }));
  };
  
  const handleBalloonClick = (balloonId) => {
    if (!isGameActive) return;
    
    // Remove balloon
    setBalloons(prev => prev.filter(b => b.id !== balloonId));
    
    // Update score
    const newScore = score + 10;
    setScore(newScore);
    updateScore(10);
    
    // Play pop sound
    if (accessibility.soundEnabled) {
      playPopSound();
    }
  };
  
  const playPopSound = () => {
    // Create a simple pop sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    gain.gain.setValueAtTime(0.3 * (accessibility.soundVolume || 1), now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'pop_balloon',
      difficulty,
      score: score,
      balloonsPoped: balloons.length,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, balloonsPoped: balloons.length, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div className={`${styles.popBalloon} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      <div className={styles.header}>
        <div className={styles.stats}>
          <div className={styles.score}>🎈 Pop: {balloons.length}</div>
          <div className={styles.score}>🎯 Score: {score}</div>
          <div className={styles.timer}>⏱️ {timeDisplay}</div>
        </div>
      </div>
      
      <div className={styles.gameArea}>
        {balloons.map(balloon => {
          const age = (Date.now() - parseInt(balloon.id)) / 1000;
          const progress = (age / balloon.duration) * 100;
          const floatTop = 100 - progress;
          
          return (
            <button
              key={balloon.id}
              className={styles.balloon}
              style={{
                width: `${balloon.size}px`,
                height: `${balloon.size}px`,
                backgroundColor: balloon.color,
                top: `${floatTop}%`,
                left: `${balloon.left}%`,
                opacity: 1 - progress / 100
              }}
              onClick={() => handleBalloonClick(balloon.id)}
              disabled={!isGameActive}
              aria-label="Pop balloon"
            />
          );
        })}
      </div>
      
      {!isGameActive && (
        <div className={styles.gameOverModal}>
          <div className={styles.gameOverCard}>
            <h2>🎉 Gra Skończona!</h2>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p>Spopychanych balonów: <strong>{balloons.length + score / 10}</strong></p>
            <ButtonBig 
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Graj Jeszcze Raz
            </ButtonBig>
          </div>
        </div>
      )}
      
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
    </div>
  );
};

export default PopBalloon;
