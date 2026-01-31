import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './RainGenerator.module.css';

const RainGenerator = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const [particles, setParticles] = useState([]);
  const [score, setScore] = useState(0);
  const [particleCount, setParticleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const particleEmojis = ['🌧️', '❄️', '🌨️', '💧'];

  const generateParticles = (e) => {
    if (!isRunning) setIsRunning(true);

    const newParticles = Array(10).fill(null).map((_, i) => ({
      id: Math.random(),
      emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
      left: e.clientX || e.touches[0].clientX,
      duration: 2 + Math.random() * 2,
      delay: i * 0.1,
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setScore(s => s + 50);
    setParticleCount(c => c + 10);
    updateScore(50);

    setTimeout(() => {
      setParticles(prev => 
        prev.filter(p => !newParticles.map(np => np.id).includes(p.id))
      );
    }, (2 + 0.5) * 1000);
  };

  return (
    <div 
      className={styles.rainContainer}
      onClick={generateParticles}
      onTouchMove={(e) => {
        e.preventDefault();
        generateParticles(e.touches[0]);
      }}
    >
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Kliknięcia:</span>
          <span className={styles.value}>{Math.floor(score / 50)}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Cząsteczki:</span>
          <span className={styles.value}>{particleCount}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <h2 className={styles.title}>Generuj deszcz! 🌧️</h2>
        <p className={styles.instruction}>Kliknij gdziekolwiek, aby stworzyć deszcz</p>
      </div>

      {particles.map(particle => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.left}px`,
            animation: `fall ${particle.duration}s linear ${particle.delay}s forwards`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default RainGenerator;
