import React, { useRef, useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './CanvasPainting.module.css';

const CanvasPainting = ({ difficulty = 'easy' }) => {
  const { accessibility, language, recordGameSession, updateScore } = useAppStore();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(20);
  const [score, setScore] = useState(0);
  const [strokes, setStrokes] = useState(0);

  const colors = [
    { hex: '#FF6B6B', name: 'Czerwony' },
    { hex: '#4ECDC4', name: 'Zielony' },
    { hex: '#FFE66D', name: 'Żółty' },
    { hex: '#A8E6CF', name: 'Miętowy' },
  ];

  const brushSizes = { easy: [15, 20], medium: [10, 25], hard: [5, 30] };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();

    if (e.type === 'mousedown' || e.type === 'touchstart') {
      setStrokes(s => s + 1);
      setScore(score => score + 10);
      updateScore(10);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStrokes(0);
  };

  const downloadPainting = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'moje-malowidlo.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={styles.paintingContainer}>
      <div className={styles.header}>
        <div className={styles.statBox}>
          <span className={styles.label}>Pociągnięcia:</span>
          <span className={styles.value}>{strokes}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Punkty:</span>
          <span className={styles.value}>{score}</span>
        </div>
      </div>

      <div className={styles.gameArea}>
        <h2 className={styles.title}>Maluj palcem! 🎨</h2>

        <div className={styles.toolsPanel}>
          <div className={styles.colorSelector}>
            <label>Kolor:</label>
            <div className={styles.colorButtons}>
              {colors.map(color => (
                <button
                  key={color.hex}
                  className={`${styles.colorButton} ${currentColor === color.hex ? styles.active : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setCurrentColor(color.hex)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className={styles.brushSelector}>
            <label>Rozmiar pędzla: {brushSize}px</label>
            <input
              type="range"
              min={brushSizes[difficulty][0]}
              max={brushSizes[difficulty][1]}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className={styles.brushSlider}
            />
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
        />

        <div className={styles.buttons}>
          <button onClick={clearCanvas} className={styles.clearButton}>
            🗑️ Wyczyść
          </button>
          <button onClick={downloadPainting} className={styles.downloadButton}>
            💾 Pobierz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasPainting;
