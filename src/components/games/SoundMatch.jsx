import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './SoundMatch.module.css';

const SoundMatch = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const animals = [
    { id: 1, name: { pl: 'Kot', en: 'Cat', de: 'Katze' }, emoji: '🐱', freq: 300 },
    { id: 2, name: { pl: 'Pies', en: 'Dog', de: 'Hund' }, emoji: '🐕', freq: 150 },
    { id: 3, name: { pl: 'Krowa', en: 'Cow', de: 'Kuh' }, emoji: '🐄', freq: 100 },
    { id: 4, name: { pl: 'Owca', en: 'Sheep', de: 'Schaf' }, emoji: '🐑', freq: 250 },
    { id: 5, name: { pl: 'Świnia', en: 'Pig', de: 'Schwein' }, emoji: '🐷', freq: 200 },
    { id: 6, name: { pl: 'Kura', en: 'Chicken', de: 'Huhn' }, emoji: '🐔', freq: 350 },
  ];

  const gameDurations = { easy: 90, medium: 120, hard: 150 };
  const itemCounts = { easy: 4, medium: 6, hard: 8 };

  const [currentAnimalIdx, setCurrentAnimalIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(gameDurations[difficulty]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Generate options for current animal
  useEffect(() => {
    const count = itemCounts[difficulty];
    const selectedAnimals = animals.slice(0, count);
    const current = selectedAnimals[currentAnimalIdx];
    
    const shuffled = [...selectedAnimals].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  }, [difficulty, currentAnimalIdx]);

  // Play sound on animal change
  useEffect(() => {
    if (!isGameActive || !accessibility.soundEnabled) return;
    
    const playAnimalSound = () => {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const current = animals[currentAnimalIdx];
        const duration = 0.5;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.frequency.value = current.freq;
        gain.gain.setValueAtTime(accessibility.soundVolume * 0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
        
        // Play 3 sound bursts
        for (let i = 1; i < 3; i++) {
          const osc2 = audioCtx.createOscillator();
          osc2.connect(gain);
          osc2.frequency.value = current.freq + (i * 50);
          osc2.start(audioCtx.currentTime + i * 0.2);
          osc2.stop(audioCtx.currentTime + i * 0.2 + 0.3);
        }
      } catch (e) {
        console.error('Audio error:', e);
      }
    };
    
    setIsPlayingSound(true);
    playAnimalSound();
    setTimeout(() => setIsPlayingSound(false), 1500);
  }, [currentAnimalIdx, isGameActive]);

  // Game timer
  useEffect(() => {
    if (!isGameActive) return;
    
    const interval = setInterval(() => {
      setGameTime(t => {
        if (t <= 1) {
          setIsGameActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isGameActive]);

  const handleAnimalClick = (animal) => {
    if (!isGameActive || isPlayingSound) return;
    
    const current = animals[currentAnimalIdx];
    
    if (animal.id === current.id) {
      setScore(s => s + 50);
      setCorrectCount(c => c + 1);
      setFeedback('✓ Dobrze!');
      updateScore(50);
      
      setTimeout(() => {
        const nextIdx = currentAnimalIdx + 1;
        if (nextIdx >= itemCounts[difficulty]) {
          setIsGameActive(false);
        } else {
          setCurrentAnimalIdx(nextIdx);
          setFeedback('');
        }
      }, 1000);
    } else {
      setFeedback('✗ Źle!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  const handleQuit = () => {
    setIsGameActive(false);
    recordGameSession({
      gameId: 'sound_match',
      difficulty,
      score,
      correctCount,
      totalAttempts: currentAnimalIdx + 1,
    });
  };

  return (
    <div className={styles.soundMatchContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Czas:</span>
          <span className={styles.value}>{gameTime}s</span>
        </div>
        <button onClick={handleQuit} className={styles.quitButton}>✕</button>
      </div>

      <div className={styles.gameArea}>
        <div className={styles.instruction}>
          Usłyszysz dźwięk - wybierz zwierzę!
        </div>

        <div className={styles.soundIndicator}>
          {isPlayingSound && <div className={styles.soundWave}>🔊</div>}
        </div>

        <div className={styles.optionsGrid}>
          {options.map((animal) => (
            <button
              key={animal.id}
              className={styles.animalButton}
              onClick={() => handleAnimalClick(animal)}
              disabled={!isGameActive}
            >
              <div className={styles.animalEmoji}>{animal.emoji}</div>
              <div className={styles.animalName}>{animal.name[language] || animal.name.pl}</div>
            </button>
          ))}
        </div>

        {feedback && <div className={styles.feedback}>{feedback}</div>}
      </div>

      {!isGameActive && (
        <div className={styles.gameOverModal}>
          <div className={styles.modalContent}>
            <h2>Koniec!</h2>
            <p>Punkty: {score}</p>
            <p>Poprawnych: {correctCount}</p>
            <button onClick={() => window.location.reload()} className={styles.replayButton}>
              Graj jeszcze raz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundMatch;
