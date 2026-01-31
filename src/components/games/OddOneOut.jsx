import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import ButtonBig from '../common/ButtonBig';
import styles from './OddOneOut.module.css';

/**
 * Odd One Out Game - Find the object that doesn't belong in the group
 * Great for categorization and logical thinking
 */
const OddOneOut = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility } = useAppStore();
  const { updateScore, recordGameSession } = useGameStore();
  
  const puzzles = [
    {
      question: { pl: 'Która to owoce?', en: 'Which one is fruit?', de: 'Welches ist das Obst?' },
      items: [{ emoji: '🍎', correct: true }, { emoji: '🍌', correct: true }, { emoji: '🥕', correct: false }, { emoji: '🍊', correct: true }],
    },
    {
      question: { pl: 'Czy to zwierzę?', en: 'Which one is an animal?', de: 'Welches ist das Tier?' },
      items: [{ emoji: '🐱', correct: true }, { emoji: '🚗', correct: false }, { emoji: '🐶', correct: true }, { emoji: '🐢', correct: true }],
    },
    {
      question: { pl: 'Czy to gra?', en: 'Which one is a toy?', de: 'Welches ist das Spielzeug?' },
      items: [{ emoji: '🎮', correct: true }, { emoji: '📚', correct: false }, { emoji: '🎨', correct: true }, { emoji: '🧩', correct: true }],
    },
    {
      question: { pl: 'Czy to do jedzenia?', en: 'Which one is food?', de: 'Welches ist das Essen?' },
      items: [{ emoji: '🍕', correct: true }, { emoji: '👕', correct: false }, { emoji: '🍪', correct: true }, { emoji: '🥫', correct: true }],
    },
    {
      question: { pl: 'Czy to pojazd?', en: 'Which one is a vehicle?', de: 'Welches ist das Fahrzeug?' },
      items: [{ emoji: '🚗', correct: true }, { emoji: '⚽', correct: false }, { emoji: '✈️', correct: true }, { emoji: '🚂', correct: true }],
    }
  ];
  
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  
  const gameDuration = { easy: 60, medium: 90, hard: 120 }[difficulty] || 60;
  const currentPuzzle = puzzles[currentPuzzleIdx];
  
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
  
  const handleItemClick = (idx) => {
    if (answered || !isGameActive) return;
    
    setAnswered(true);
    setSelectedIdx(idx);
    
    const item = currentPuzzle.items[idx];
    
    if (!item.correct) {
      // Found the odd one out!
      const newScore = score + 50;
      const newCorrect = correct + 1;
      setScore(newScore);
      setCorrect(newCorrect);
      updateScore(50);
      
      // Move to next puzzle after delay
      setTimeout(() => {
        if (currentPuzzleIdx < puzzles.length - 1) {
          setCurrentPuzzleIdx(currentPuzzleIdx + 1);
          setAnswered(false);
          setSelectedIdx(null);
        } else {
          setIsGameActive(false);
          handleGameEnd();
        }
      }, 1500);
    } else {
      // Wrong answer - try again
      setTimeout(() => {
        setAnswered(false);
        setSelectedIdx(null);
      }, 1000);
    }
  };
  
  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'odd_one_out',
      difficulty,
      score: score,
      correct: correct,
      isCorrect: true
    });
    
    if (onGameEnd) {
      onGameEnd({ score, correct, success: true });
    }
  };
  
  const handleQuit = () => {
    setIsGameActive(false);
    handleGameEnd();
  };
  
  const timeRemaining = gameDuration - gameTime;
  const timeDisplay = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
  
  return (
    <div className={`${styles.oddOneOut} ${accessibility.hideAnimations ? 'hideAnimations' : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span>🎯 Poprawne:</span>
          <span className={styles.value}>{correct}</span>
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
        {/* Question */}
        <h2 className={styles.question}>
          {currentPuzzle.question[accessibility.language] || currentPuzzle.question.en}
        </h2>
        
        {/* Items Grid */}
        <div className={styles.itemsGrid}>
          {currentPuzzle.items.map((item, idx) => (
            <button
              key={idx}
              className={`${styles.itemButton} ${selectedIdx === idx ? (item.correct ? styles.wrong : styles.correct) : ''}`}
              onClick={() => handleItemClick(idx)}
              disabled={answered}
            >
              <span className={styles.emoji}>{item.emoji}</span>
              {selectedIdx === idx && (
                <span className={styles.feedback}>
                  {item.correct ? '❌' : '✓'}
                </span>
              )}
            </button>
          ))}
        </div>
        
        {/* Progress */}
        <div className={styles.progress}>
          <span>Pytanie {currentPuzzleIdx + 1} z {puzzles.length}</span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${((currentPuzzleIdx + 1) / puzzles.length) * 100}%` }}
            />
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
            <p>Poprawne odpowiedzi: <strong>{correct}/{puzzles.length}</strong></p>
            <p>Twój wynik: <strong>{score}</strong></p>
            <p className={styles.message}>
              {correct === puzzles.length ? 'Doskonale! Wszystkie odpowiedzi! 🌟' : 'Świetnie Ci poszło! 💪'}
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

export default OddOneOut;
