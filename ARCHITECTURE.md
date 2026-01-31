# 📐 Architektura Aplikacji Autyzm

## Przegląd systemu

Aplikacja zbudowana jest w React 18 z następującą architekturą:

```
┌─────────────────────────────────────────┐
│         Warstwa Prezentacji             │
│  (React Components + CSS Modules)       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Warstwa Logiki Biznesowej       │
│  (Store - Zustand, Helpersy)            │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Warstwa Danych i Konfiguracji      │
│  (JSON, LocalStorage, i18n)             │
└─────────────────────────────────────────┘
```

## Komponenty architekturalne

### 1. **Warstwa Prezentacji**
```
src/
├── components/
│   ├── common/           # Komponenty wielokrotnego użytku
│   │   ├── ButtonBig
│   │   └── Card
│   ├── games/            # Logika poszczególnych gier
│   │   ├── MemoryGame
│   │   ├── MatchingGame
│   │   └── QuizGame
│   └── layout/           # Layout aplikacji
│       ├── Header
│       └── Navigation
└── pages/                # Główne strony
    ├── HomePage
    ├── GamesPage
    ├── LibraryPage
    ├── StatisticsPage
    └── SettingsPage
```

### 2. **Warstwa Logiki**
```
src/
├── store/                # Stan aplikacji (Zustand)
│   └── appStore.js       # Główny store
├── utils/                # Funkcje pomocnicze
│   └── helpers.js        # Utility functions
└── hooks/                # Custom React hooks (opcjonalnie)
```

### 3. **Warstwa Danych**
```
src/
├── data/
│   ├── wordsBase.js      # 2000+ słów w wielu językami
│   └── gamesConfig.js    # Konfiguracja 20 gier
├── i18n/
│   └── config.js         # Konfiguracja 200+ języków
└── styles/
    └── variables.css     # Zmienne CSS (kolory, rozmiary)
```

## State Management (Zustand)

### App Store
```javascript
useAppStore() {
  // Język
  language: 'pl'
  setLanguage()
  
  // Ustawienia dostępności
  accessibility: {
    soundEnabled,
    highContrast,
    blackAndWhite,
    largeButtons,
    hideAnimations,
    timerDisabled,
    buttonSize,
    textSize,
    soundVolume,
    colorMode
  }
  updateAccessibility()
  
  // Profil dziecka
  childProfile: {
    name,
    age,
    difficultyLevel,
    learningStyle,
    interests,
    allergies,
    sensitivities
  }
  updateChildProfile()
  
  // Biblioteka słów
  customWords: []
  addCustomWord()
  deleteCustomWord()
  
  // Własne kategorie
  customCategories: []
  addCustomCategory()
  
  // Własne gry
  customGames: []
  addCustomGame()
  
  // Statystyki
  statistics: {
    wordsLearned: [],
    gamesPlayed: [],
    totalScore,
    streakDays,
    lastPlayDate
  }
  recordGameSession()
  recordWordLearned()
  
  // Powiadomienia
  notifications: []
  addNotification()
  removeNotification()
}
```

### Game Store
```javascript
useGameStore() {
  currentGame: null
  gameState: 'idle' | 'playing' | 'paused' | 'finished'
  score: 0
  mistakes: 0
  startTime: null
  endTime: null
  
  startGame()
  endGame()
  updateScore()
  updateMistakes()
  resetGame()
}
```

## Przepływ danych

### Gra Memoria
1. Użytkownik wybiera grę → `GamesPage.jsx`
2. Komponenta MemoryGame się renderuje
3. Pobiera słowa z `WORDS_DATABASE`
4. Tasuje karty
5. Użytkownik klika kartę
6. Komponenta przechowuje state gry
7. Jeśli para - aktualizuje `useGameStore().score`
8. Koniec gry → zapisuje sesję w `appStore.statistics`

```
Użytkownik
    ↓
GamesPage (routing)
    ↓
MemoryGame (logika gry)
    ↓
useGameStore (state gry)
    ↓
useAppStore (globalne ustawienia)
    ↓
Render UI
```

## Zarządzanie stanem

### LocalStorage (Persist)
- Ustawienia dostępności
- Profil dziecka
- Własne słowa
- Statystyki
- Historia gier

### Store Zustand
```javascript
// Persist middleware
persist((set, get) => ({...}), {
  name: 'autism-app-store'
})
```

## Obsługa dostępności

### CSS Classes Dynamiczne
```javascript
if (accessibility.hideAnimations) {
  root.classList.add('hideAnimations')
}
if (accessibility.highContrast) {
  root.classList.add('highContrast')
}
if (accessibility.blackAndWhite) {
  root.classList.add('bw')
}
```

### Zmienne CSS
```css
:root {
  --color-primary: #E8D5E8;    /* Pastelowy fiolet */
  --color-secondary: #D5E8E8;  /* Pastelowy błękit */
  --color-success: #D5E8D5;    /* Pastelowa zieleń */
  /* ... */
}
```

## Multilingual System

### i18n Config
```javascript
i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: {...} },
    en: { translation: {...} },
    de: { translation: {...} },
    /* 200+ języków */
  }
})
```

### Użycie w komponencie
```javascript
const { t } = useTranslation()
return <h1>{t('menu.home')}</h1>
```

## Obsługa touchscreena

```javascript
isTouchDevice() {
  return (
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0)
  )
}
```

## Performance Optimization

### Code Splitting
- Każda strona (`pages/`) jest odrębną częścią
- Gry są w oddzielnych komponentach
- Lazy loading (opcjonalnie)

### Memoization
```javascript
React.memo(Component)
useMemo()
useCallback()
```

### CSS Optimization
- CSS Modules - scope izolacji
- Zmienne CSS - minimalna redundancja
- Pastelowe kolory - mniej stresu dla oczu

## Asset Pipeline

```
src/
└── assets/
    ├── images/
    │   ├── emotki/
    │   ├── przedmioty/
    │   ├── kolory/
    │   └── zwierzęta/
    ├── sounds/
    │   ├── success.mp3
    │   ├── error.mp3
    │   └── ...
    └── icons/
```

## Build Process

```bash
npm run build
```

Output: `build/` folder

- HTML minifikowany
- JavaScript bundled + minifikowany
- CSS minifikowany
- Assets zoptymalizowane
- Source maps (dla developmentu)

## Testing (Future)

```
src/
└── __tests__/
    ├── components/
    ├── pages/
    ├── store/
    └── utils/
```

## Security Notes

✅ LocalStorage only - brak wysyłania danych
✅ Brak API keys w clientzie
✅ XSS protection - React sanitizuje
✅ Brak logowania - uproszczona architektura
✅ Offline first - pełna funkcjonalność bez internetu

## Scaling Strategy

Dla przyszłych rozszerzeń:

1. **Backend** (optional)
   - Firebase/Supabase dla sync
   - API dla nowych gier
   - Analytics

2. **Mobile**
   - React Native
   - Native iOS/Android apps

3. **AI/ML**
   - Rozpoznawanie emocji
   - Personalizacja adaptywna
   - Trackowanie postępu AI

4. **Multi-user**
   - Sync między urządzeniami
   - Rodzic + dziecko
   - Terapeuta + dziecko

---

**Architektura zaprojektowana dla prostoty, wydajności i dostępności.**
