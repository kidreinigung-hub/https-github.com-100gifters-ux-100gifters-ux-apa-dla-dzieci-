# 🎮 API Gier - Dokumentacja Programisty

## Jak dodać nową grę

### 1. Zdefiniuj grę w `gamesConfig.js`

```javascript
{
  id: GAMES.YOUR_GAME,
  name: { 
    pl: 'Nazwa Gry',
    en: 'Game Name',
    de: 'Spielname'
  },
  description: { 
    pl: 'Opis gry',
    en: 'Game description'
  },
  category: 'cognitive', // cognitive, language, emotional, sensory, motor, math
  difficulty: ['easy', 'medium', 'hard'],
  minAge: 4,
  duration: 5, // minuty
  learningType: 'visual_memory',
  icon: 'icon_name'
}
```

### 2. Stwórz komponent gry

**Lokalizacja:** `src/components/games/YourGame.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import { useAppStore, useGameStore } from '../../store/appStore';
import styles from './YourGame.module.css';

export const YourGame = ({ difficulty = 'easy', onGameEnd }) => {
  const { accessibility, language, recordGameSession } = useAppStore();
  const { updateScore, updateMistakes } = useGameStore();

  // Twoja logika gry
  
  const handleGameEnd = (success) => {
    recordGameSession({
      gameId: 'your_game',
      difficulty,
      score,
      isCorrect: success
    });
    onGameEnd?.({ success, score });
  };

  return (
    <div className={styles.yourGame}>
      {/* UI gry */}
    </div>
  );
};

export default YourGame;
```

### 3. Stwórz style

**Lokalizacja:** `src/components/games/YourGame.module.css`

```css
.yourGame {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

/* Twoje style */
```

### 4. Dodaj do indexu gier

**Plik:** `src/components/games/index.js`

```javascript
export { YourGame } from './YourGame';
```

### 5. Zarejestruj w GamesPage

**Plik:** `src/pages/GamesPage.jsx`

```javascript
import { YourGame } from '../components/games';

// W handleGameSelect():
case GAMES.YOUR_GAME:
  return <YourGame difficulty={difficulty} onGameEnd={handleEndGame} />;
```

## Game API - Interfejs

### Props
```javascript
{
  difficulty: 'easy' | 'medium' | 'hard',
  onGameEnd: (result) => void
}
```

### onGameEnd Callback
```javascript
onGameEnd({
  success: boolean,
  score: number,
  moves?: number,
  accuracy?: number,
  timeSpent?: number
})
```

## Hooks do użytku

### useAppStore()
```javascript
const {
  language,                    // Obecny język
  accessibility,               // Ustawienia dostępności
  recordGameSession,          // Zapisz sesję gry
  recordWordLearned,          // Zapisz nauczonym słowem
  addNotification,            // Dodaj notyfikację
  statistics,                 // Globalne statystyki
  childProfile                // Profil dziecka
} = useAppStore()
```

### useGameStore()
```javascript
const {
  currentGame,                // ID obecnej gry
  gameState,                  // 'idle' | 'playing' | 'paused' | 'finished'
  score,                      // Obecny score
  mistakes,                   // Liczba błędów
  startGame,                  // Rozpocznij grę
  endGame,                    // Zakończ grę
  updateScore,                // Dodaj punkty
  updateMistakes,             // Dodaj błędy
  resetGame                   // Zresetuj grę
} = useGameStore()
```

## Utility Functions

### Przydatne helpers
```javascript
import { 
  shuffleArray,           // Potasuj tablicę
  getRandomItems,         // Losowe elementy
  delay,                  // Promise-based delay
  calculateAccuracy,      // Procent dokładności
  formatTime,             // Sformatuj czas (mm:ss)
  playSound,              // Graj dźwięk
  isTouchDevice           // Czy dotyk dostępny
} from '../utils/helpers'
```

### Dane słów
```javascript
import {
  WORDS_DATABASE,         // Baza 2000+ słów
  WORD_CATEGORIES,        // Lista kategorii
  getWordsByCategory,     // Pobierz słowa z kategorii
  getWordTranslation      // Tłumaczenie słowa
} from '../data/wordsBase'
```

## Best Practices

### ✅ Accessibility
```javascript
// Zawsze sprawdzaj accessibility settings
if (accessibility.soundEnabled) {
  playSound('success')
}

// Ukryj animacje jeśli wyłączone
if (accessibility.hideAnimations) {
  // Brak animation CSS
}

// Obsługuj duże przyciski
if (accessibility.largeButtons) {
  // Zwiększ rozmiary
}
```

### ✅ Touch Support
```javascript
// Obsługuj zarówno click jak i touch
onClick={() => handleClick()}
onTouchEnd={() => handleClick()}

// Lub dla div/span
onClick={() => handleClick()}
onKeyPress={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick()
  }
}}
```

### ✅ Multilingual
```javascript
import { useTranslation } from 'react-i18next'
const { t } = useTranslation()

return <h1>{t('games.memory')}</h1>
```

### ✅ Performance
```javascript
// Memoizuj komponenty
export const YourGame = React.memo(({ difficulty, onGameEnd }) => {
  // ...
})

// Użyj useCallback dla handlersów
const handleClick = useCallback(() => {
  // ...
}, [dependencies])
```

## Rodzaje gier - Przykłady

### Game Type: Matching (Dopasowanie)
```javascript
// User matches pairs
// Score: +10 per correct match
// Feedback: Instant visual/audio feedback
```

### Game Type: Quiz (Test)
```javascript
// User selects correct answer
// Score: +10 per correct answer
// Feedback: Answer reveal + next button
```

### Game Type: Memory (Pamięć)
```javascript
// User finds pairs of cards
// Score: +10 per pair found
// Feedback: Card flip animation
```

### Game Type: Sequence (Sekwencja)
```javascript
// User arranges items in order
// Score: +10 per correct sequence
// Feedback: Highlight correct/incorrect
```

### Game Type: Counting (Liczenie)
```javascript
// User counts objects
// Score: +10 for correct count
// Feedback: Number of objects
```

## Metrics & Analytics

### Recording Game Session
```javascript
recordGameSession({
  gameId: 'memory_game',
  difficulty: 'easy',
  score: 50,
  moves: 12,
  accuracy: 85,
  timeSpent: 300, // seconds
  isCorrect: true
})
```

### Learning Progress
```javascript
// Automatycznie track'owany przez:
- recordWordLearned() 
- recordGameSession()
- Visible w StatisticsPage
```

## Accessibility Features

### Audio Cues
```javascript
if (accessibility.soundEnabled) {
  playSound('success')  // poprawna odpowiedź
  playSound('error')    // błąd
  playSound('flip')     // akcja
}
```

### Visual Modes
```javascript
// High Contrast
.bw { filter: contrast(1.5) }

// Black & White
.highContrast { border-width: 3px }

// Large Text
.largeText { font-size: 24px }
```

### Motor Accessibility
```javascript
// Duże przyciski dla dzieci z tremorem
// Brak czasu na wykonanie (disable timers)
// Brak szybkich przejść (disable animations)
// Obsługa klawiatury (accessibility)
```

## Testowanie gry

```javascript
// W przeglądarce DevTools
const { useAppStore } = await import('./store/appStore')
const store = useAppStore()

// Zmień ustawienia
store.updateAccessibility({
  soundEnabled: false,
  highContrast: true
})

// Zapisz grę
store.recordGameSession({
  gameId: 'test_game',
  difficulty: 'easy',
  score: 100,
  isCorrect: true
})

// Sprawdź statystyki
console.log(store.statistics)
```

## Troubleshooting

### Problem: Gra się nie renderuje
- Sprawdź czy import jest w `GamesPage.jsx`
- Sprawdź console dla błędów
- Sprawdź czy module.css jest poprawnie importowany

### Problem: Dźwięki nie grają
- Sprawdź czy `accessibility.soundEnabled` jest true
- Sprawdź czy ścieżka do pliku dźwięku jest poprawna
- Sprawdź browser console dla błędów

### Problem: State nie updatea się
- Upewnij się że korzystasz z `useGameStore()` hook
- Sprawdź czy `updateScore()` jest wywoływany
- Sprawdź czy `recordGameSession()` jest na końcu

---

**Happy Coding! 🎮✨**
