import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './HelloButton.module.css';

const HelloButton = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [score, setScore] = useState(0);

  const greeting = {
    pl: "Cześć moja córeczko! Kocham Cię bardzo!",
    en: "Hello my dear daughter! I love you so much!",
    de: "Hallo meine liebe Tochter! Ich liebe dich sehr!",
  };

  const playGreeting = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    setButtonPressed(true);
    setClickCount(c => c + 1);
    setScore(s => s + 100);
    updateScore(100);

    // Use Web Speech API for text-to-speech
    const utterance = new SpeechSynthesisUtterance(greeting[language] || greeting.pl);
    utterance.lang = language === 'pl' ? 'pl-PL' : language === 'de' ? 'de-DE' : 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = (accessibility?.soundVolume || 1) * 0.8;

    utterance.onend = () => {
      setIsPlaying(false);
      setTimeout(() => setButtonPressed(false), 300);
    };

    try {
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      setIsPlaying(false);
      setButtonPressed(false);
    }

    recordGameSession({
      gameId: 'hello_button',
      difficulty,
      score: 100,
      greetingPlays: clickCount + 1,
    });
  };

  return (
    <div className={styles.helloContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Kliknięcia:</span>
          <span className={styles.value}>{clickCount}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <div className={styles.greeting}>
          <p className={styles.greetingText}>💝 Wiadomość od Tatusia 💝</p>
        </div>

        <button
          onClick={playGreeting}
          disabled={isPlaying}
          className={`${styles.helloButton} ${buttonPressed ? styles.pressed : ''}`}
        >
          <span className={styles.buttonEmoji}>👋</span>
          <span className={styles.buttonText}>
            {isPlaying ? 'Słuchaj...' : 'Kliknij dla powitania!'}
          </span>
        </button>

        {isPlaying && (
          <div className={styles.audioIndicator}>
            <div className={styles.wave} />
            <div className={styles.wave} />
            <div className={styles.wave} />
          </div>
        )}

        <div className={styles.info}>
          <p>Tatusia przesyła Ci powitanie przez gre!</p>
          <p>Kliknij przycisk aby go usłyszeć 💕</p>
        </div>
      </div>
    </div>
  );
};

export default HelloButton;
