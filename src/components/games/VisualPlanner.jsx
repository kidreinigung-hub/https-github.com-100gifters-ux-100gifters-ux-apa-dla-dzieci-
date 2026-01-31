import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './VisualPlanner.module.css';

const VisualPlanner = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const taskSets = { easy: 3, medium: 5, hard: 7 };

  const allTasks = [
    { id: 1, emoji: '🧼', name: { pl: 'Umyj ręce', en: 'Wash hands', de: 'Hände waschen' } },
    { id: 2, emoji: '🍽️', name: { pl: 'Zjedz obiad', en: 'Eat lunch', de: 'Mittagessen' } },
    { id: 3, emoji: '📚', name: { pl: 'Czytaj książkę', en: 'Read book', de: 'Buch lesen' } },
    { id: 4, emoji: '🎮', name: { pl: 'Graj w grę', en: 'Play game', de: 'Spiel spielen' } },
    { id: 5, emoji: '🛏️', name: { pl: 'Idź do łóżka', en: 'Go to bed', de: 'Zu Bett gehen' } },
    { id: 6, emoji: '🚿', name: { pl: 'Weź prysznic', en: 'Take shower', de: 'Dusche nehmen' } },
    { id: 7, emoji: '🧦', name: { pl: 'Załóż ubranie', en: 'Get dressed', de: 'Anziehen' } },
  ];

  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState([]);

  // Initialize tasks
  useEffect(() => {
    const count = taskSets[difficulty];
    const selected = allTasks.slice(0, count).map(t => ({ ...t, done: false }));
    setTasks(selected);
  }, [difficulty]);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(t => 
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    setTasks(newTasks);

    if (!completed.includes(taskId)) {
      setCompleted([...completed, taskId]);
      setScore(s => s + 50);
      updateScore(50);
      createConfetti();
    }
  };

  const createConfetti = () => {
    const newConfetti = Array(15).fill(null).map((_, i) => ({
      id: Math.random(),
      emoji: ['🎉', '✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)],
      left: Math.random() * 100,
      delay: i * 0.05,
    }));
    setConfetti(newConfetti);

    setTimeout(() => setConfetti([]), 2000);
  };

  const allDone = tasks.length > 0 && tasks.every(t => t.done);

  return (
    <div className={styles.plannerContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Wykonano:</span>
          <span className={styles.value}>{completed.length}/{tasks.length}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <h2 className={styles.title}>Plan dnia 📋</h2>

        <div className={styles.tasksList}>
          {tasks.map((task) => (
            <button
              key={task.id}
              className={`${styles.taskItem} ${task.done ? styles.completed : ''}`}
              onClick={() => handleTaskClick(task.id)}
            >
              <span className={styles.taskEmoji}>{task.emoji}</span>
              <span className={styles.taskName}>{task.name[language] || task.name.pl}</span>
              {task.done && <span className={styles.checkmark}>✓</span>}
            </button>
          ))}
        </div>

        {allDone && (
          <div className={styles.successMessage}>
            <div className={styles.celebration}>🎉 SUPER! 🎉</div>
            <p>Wykonałeś wszystkie zadania!</p>
          </div>
        )}
      </div>

      {confetti.map(conf => (
        <div
          key={conf.id}
          className={styles.confetti}
          style={{
            left: `${conf.left}%`,
            animationDelay: `${conf.delay}s`,
          }}
        >
          {conf.emoji}
        </div>
      ))}
    </div>
  );
};

export default VisualPlanner;
