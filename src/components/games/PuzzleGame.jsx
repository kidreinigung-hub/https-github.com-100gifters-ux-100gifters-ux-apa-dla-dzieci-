import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './PuzzleGame.module.css';

const PuzzleGame = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();

  const gameSizes = { easy: { cols: 2, rows: 2 }, medium: { cols: 3, rows: 3 }, hard: { cols: 4, rows: 4 } };
  const gameDurations = { easy: 120, medium: 180, hard: 240 };

  const size = gameSizes[difficulty];
  const totalPieces = size.cols * size.rows;

  const puzzleImages = [
    { id: 1, emoji: '🐱', color: '#FFB6C1' },
    { id: 2, emoji: '🐕', color: '#98D8C8' },
    { id: 3, emoji: '🌟', color: '#FFE66D' },
    { id: 4, emoji: '🎨', color: '#A8D8F0' },
  ];

  const [selectedImage, setSelectedImage] = useState(puzzleImages[0]);
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [dropZones, setDropZones] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(gameDurations[difficulty]);
  const [isGameActive, setIsGameActive] = useState(true);

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, [difficulty]);

  const initializePuzzle = () => {
    const pieces = [];
    for (let i = 0; i < totalPieces; i++) {
      pieces.push({
        id: i,
        imageId: selectedImage.id,
        position: { x: Math.random() * 60, y: Math.random() * 40 },
        correctPosition: i,
      });
    }
    
    const zones = [];
    for (let i = 0; i < totalPieces; i++) {
      zones.push({
        id: i,
        col: i % size.cols,
        row: Math.floor(i / size.cols),
      });
    }

    setPuzzlePieces(pieces.sort(() => Math.random() - 0.5));
    setDropZones(zones);
    setPlaced([]);
  };

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

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    
    if (!draggedPiece || !isGameActive) return;

    if (draggedPiece.correctPosition === zone.id && !placed.includes(zone.id)) {
      setPlaced([...placed, zone.id]);
      setScore(s => s + 50);
      updateScore(50);
      setDraggedPiece(null);

      if (placed.length + 1 === totalPieces) {
        setIsGameActive(false);
        recordGameSession({
          gameId: 'puzzle_game',
          difficulty,
          score: score + 50,
          puzzlesCompleted: 1,
        });
      }
    } else {
      setDraggedPiece(null);
    }
  };

  const handleQuit = () => {
    setIsGameActive(false);
    recordGameSession({
      gameId: 'puzzle_game',
      difficulty,
      score,
      piecesPlaced: placed.length,
    });
  };

  const pieceSize = 100 / size.cols;

  return (
    <div className={styles.puzzleContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Ułożone:</span>
          <span className={styles.value}>{placed.length}/{totalPieces}</span>
        </div>
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
          Przeciągnij kawałki do odpowiednich miejsc!
        </div>

        <div className={styles.puzzleBoard}>
          <div 
            className={styles.dropZonesGrid}
            style={{
              gridTemplateColumns: `repeat(${size.cols}, 1fr)`,
            }}
          >
            {dropZones.map((zone) => (
              <div
                key={zone.id}
                className={`${styles.dropZone} ${placed.includes(zone.id) ? styles.filled : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, zone)}
                style={{
                  backgroundColor: placed.includes(zone.id) ? selectedImage.color : 'rgba(255,255,255,0.3)',
                  fontSize: `${pieceSize * 0.4}px`,
                }}
              >
                {placed.includes(zone.id) && <span>{selectedImage.emoji}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.piecesArea}>
          <div className={styles.piecesLabel}>Kawałki do ułożenia:</div>
          <div className={styles.pieces}>
            {puzzlePieces
              .filter(p => !placed.includes(p.correctPosition))
              .map((piece) => (
                <div
                  key={piece.id}
                  draggable
                  className={styles.piece}
                  onDragStart={(e) => handleDragStart(e, piece)}
                  style={{
                    backgroundColor: selectedImage.color,
                    cursor: 'grab',
                  }}
                >
                  {selectedImage.emoji}
                </div>
              ))}
          </div>
        </div>
      </div>

      {!isGameActive && (
        <div className={styles.gameOverModal}>
          <div className={styles.modalContent}>
            <h2>{placed.length === totalPieces ? 'Brawo! 🎉' : 'Koniec!'}</h2>
            <p>Ułożyłeś: {placed.length}/{totalPieces} kawałków</p>
            <p>Punkty: {score}</p>
            <button onClick={() => window.location.reload()} className={styles.replayButton}>
              Graj jeszcze raz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
