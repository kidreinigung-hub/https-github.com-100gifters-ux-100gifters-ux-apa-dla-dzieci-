import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './InteractiveMap.module.css';

const InteractiveMap = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const locations = [
    { id: 1, name: { pl: 'Essen (Niemcy)', en: 'Essen (Germany)', de: 'Essen (Deutschland)' }, emoji: '🏰', x: 70, y: 30 },
    { id: 2, name: { pl: 'Polska', en: 'Poland', de: 'Polen' }, emoji: '🇵🇱', x: 50, y: 50 },
  ];

  const [startLocation, setStartLocation] = useState(0);
  const [endLocation, setEndLocation] = useState(1);
  const [planePos, setPlanePos] = useState({ x: 70, y: 30 });
  const [isFlying, setIsFlying] = useState(false);
  const [score, setScore] = useState(0);
  const [trips, setTrips] = useState(0);

  const startTrip = () => {
    if (isFlying) return;
    
    setIsFlying(true);
    const start = locations[startLocation];
    const end = locations[endLocation];
    const duration = 3;

    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      setPlanePos({
        x: start.x + (end.x - start.x) * progress,
        y: start.y + (end.y - start.y) * progress,
      });

      if (progress === 1) {
        clearInterval(interval);
        setIsFlying(false);
        setScore(s => s + 100);
        setTrips(t => t + 1);
        updateScore(100);
        setStartLocation(endLocation);
        setEndLocation(startLocation);
      }
    }, 30);
  };

  useEffect(() => {
    if (trips > 0 && trips % 3 === 0) {
      recordGameSession({
        gameId: 'interactive_map',
        difficulty,
        score,
        trips,
      });
    }
  }, [trips]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Podróże:</span>
          <span className={styles.value}>{trips}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <h2 className={styles.title}>Mapa lotów ✈️</h2>

        <div className={styles.mapVisualization}>
          <svg className={styles.mapSvg} viewBox="0 0 100 100">
            {/* Simple map background */}
            <rect width="100" height="100" fill="#e8f4f8" />
            
            {/* Connection line */}
            <line
              x1={locations[startLocation].x}
              y1={locations[startLocation].y}
              x2={locations[endLocation].x}
              y2={locations[endLocation].y}
              stroke="#ddd"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />

            {/* Location markers */}
            {locations.map((loc) => (
              <g key={loc.id}>
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="4"
                  fill="#ff6b6b"
                  opacity="0.5"
                />
              </g>
            ))}

            {/* Plane */}
            <g style={{ transform: `translate(${planePos.x}%, ${planePos.y}%)` }}>
              <text x="0" y="0" fontSize="5" textAnchor="middle" className={styles.plane}>
                ✈️
              </text>
            </g>
          </svg>

          <div className={styles.locationsDisplay}>
            <div className={styles.location}>
              <span className={styles.emoji}>{locations[startLocation].emoji}</span>
              <span className={styles.locationName}>
                {locations[startLocation].name[language] || locations[startLocation].name.pl}
              </span>
              <span className={styles.label}>Zaczyna się tutaj</span>
            </div>

            <div className={styles.arrow}>→</div>

            <div className={styles.location}>
              <span className={styles.emoji}>{locations[endLocation].emoji}</span>
              <span className={styles.locationName}>
                {locations[endLocation].name[language] || locations[endLocation].name.pl}
              </span>
              <span className={styles.label}>Leci tutaj</span>
            </div>
          </div>
        </div>

        <button
          onClick={startTrip}
          disabled={isFlying}
          className={styles.flyButton}
        >
          {isFlying ? '✈️ Lecimy...' : '✈️ Leć!'}
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;
