import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import { getRandomItems, shuffleArray, playSound } from '../../utils/helpers';
import { WORDS_DATABASE } from '../../data/wordsBase';
import styles from './QuizGame.module.css';

/**
 * Quiz - Zgadnij słowo z obrazka
 */
export const QuizGame = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language, recordGameSession } = useAppStore();
  const { updateScore } = useGameStore();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const difficultyConfig = {
    easy: { count: 5, options: 2 },
    medium: { count: 8, options: 3 },
    hard: { count: 10, options: 4 }
  };

  const config = difficultyConfig[difficulty];

  // Inicjacja gry
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const words = getRandomItems(WORDS_DATABASE, config.count);
    
    const quizQuestions = words.map((word) => {
      const wrongAnswers = getRandomItems(
        WORDS_DATABASE.filter((w) => w.id !== word.id),
        config.options - 1
      );

      const options = shuffleArray([
        {
          id: word.id,
          text: word.translations[language] || word.translations['en'],
          correct: true
        },
        ...wrongAnswers.map((w) => ({
          id: w.id,
          text: w.translations[language] || w.translations['en'],
          correct: false
        }))
      ]);

      return {
        id: word.id,
        image: word.image,
        text: word.translations[language] || word.translations['en'],
        options
      };
    });

    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
  };

  const handleAnswer = (option) => {
    if (answered) return;

    setAnswered(true);
    setIsCorrect(option.correct);

    if (option.correct) {
      const newScore = score + 10;
      setScore(newScore);
      updateScore(10);

      if (accessibility.soundEnabled) {
        playSound('success');
      }
    } else {
      if (accessibility.soundEnabled) {
        playSound('error');
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
    } else {
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    recordGameSession({
      gameId: 'quiz_game',
      difficulty,
      score,
      isCorrect: true
    });
    onGameEnd?.({ success: true, score });
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <div className={styles.quizGame}>
      <div className={styles.header}>
        <div className={styles.progress}>
          <span className={styles.counter}>
            {currentIndex + 1} / {questions.length}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Punkty:</span>
          <span className={styles.scoreValue}>{score}</span>
        </div>
      </div>

      <div className={styles.questionContainer}>
        <h3 className={styles.questionTitle}>
          Jak się to czyta?
        </h3>

        {currentQuestion.image && (
          <div className={styles.imageContainer}>
            <img src={currentQuestion.image} alt="Quiz" />
          </div>
        )}

        <div className={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className={`${styles.option} ${
                answered && option.correct ? styles.correct : ''
              } ${
                answered && !option.correct && selectedAnswer?.id === option.id
                  ? styles.incorrect
                  : ''
              } ${answered ? styles.disabled : ''}`}
              onClick={() => handleAnswer(option)}
              disabled={answered}
            >
              {option.text}
            </button>
          ))}
        </div>

        {answered && (
          <div className={`${styles.feedback} ${isCorrect ? styles.success : ''}`}>
            <span className={styles.feedbackIcon}>
              {isCorrect ? '✅' : '❌'}
            </span>
            <span className={styles.feedbackText}>
              {isCorrect ? 'Dobrze!' : 'Spróbuj jeszcze raz'}
            </span>
          </div>
        )}

        {answered && (
          <button className={styles.nextButton} onClick={handleNext}>
            {currentIndex < questions.length - 1 ? 'Dalej →' : 'Koniec'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
