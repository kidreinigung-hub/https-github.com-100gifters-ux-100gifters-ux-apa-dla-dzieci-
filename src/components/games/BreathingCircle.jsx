import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './BreathingCircle.module.css';

const BreathingCircle = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const cycleDurations = { easy: 8, medium: 6, hard: 4 }; // Seconds per cycle
  const [circleSize, setCircleSize] = useState(100);
  const [sessionCount, setSessionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [instructions, setInstructions] = useState('Wdychaj...');
  const [isAnimating, setIsAnimating] = useState(true);

  const cycleDuration = cycleDurations[difficulty];
  const inhaleDuration = cycleDuration * 0.4;
  const holdDuration = cycleDuration * 0.2;
  const exhaleDuration = cycleDuration * 0.4;

  useEffect(() => {
    if (!isAnimating) return;

    let animationPhase = 0;

    const animationInterval = setInterval(() => {
      const now = Date.now();
      const phase = (now / (cycleDuration * 1000)) % 4;

      if (phase < 1) {
        // Inhale
        setCircleSize(100 + phase * 100);
        setInstructions('Wdychaj...');
      } else if (phase < 1.5) {
        // Hold
        setCircleSize(200);
        setInstructions('Wstrzymaj oddech...');
      } else if (phase < 3) {
        // Exhale
        setCircleSize(200 - (phase - 1.5) * 100 * (2 / 1.5));
        setInstructions('Wydychaj...');
      } else {
        // Rest
        setCircleSize(100);
        setInstructions('Odpoczynek...');
      }
    }, 50);

    return () => clearInterval(animationInterval);
  }, [isAnimating, cycleDuration]);

  const addBreathingSession = () => {
    setSessionCount(c => c + 1);
    setScore(s => s + 100);
    updateScore(100);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  useEffect(() => {
    if (sessionCount > 0 && sessionCount % 5 === 0) {
      recordGameSession({
        gameId: 'breathing_circle',
        difficulty,
        score,
        breathingSessions: sessionCount,
      });
    }
  }, [sessionCount]);

  return (
    <div className={styles.breathingContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Sesje:</span>
          <span className={styles.value}>{sessionCount}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <h2 className={styles.title}>Oddychaj razem ze mną 🌬️</h2>

        <div className={styles.circleContainer}>
          <div
            className={styles.breathingCircle}
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          />
          <div className={styles.instruction}>{instructions}</div>
        </div>

        <div className={styles.info}>
          <p>Jeden cykl: {cycleDuration} sekund</p>
          <p>Wdychaj → Wstrzymaj → Wydychaj</p>
        </div>

        <button onClick={addBreathingSession} className={styles.completeButton}>
          ✓ Ukończyłem sesję
        </button>

        <button onClick={toggleAnimation} className={styles.toggleButton}>
          {isAnimating ? '⏸️ Pauza' : '▶️ Wznów'}
        </button>
      </div>
    </div>
  );
};

export default BreathingCircle;
