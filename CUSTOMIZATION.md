# 🎨 Personalizacja i Dostępność

## Ustawienia Dostępności

### Audio Settings
```javascript
accessibility: {
  soundEnabled: true,        // Włącz/wyłącz dźwięk
  soundVolume: 0.7,          // 0.0 - 1.0
}
```

**Dźwięki:**
- ✅ success.mp3 - poprawna odpowiedź
- ❌ error.mp3 - błąd
- 🔄 flip.mp3 - akcja
- ⭐ reward.mp3 - osiągnięcie
- 🎵 theme.mp3 - muzyka w tle (opcjonalnie)

### Visual Settings

#### High Contrast
```javascript
accessibility: {
  highContrast: false  // Zwiększa kontrast kolorów
}
```
- Grubsze obramowania (3-4px)
- Jaśniejsze kolory
- Wyraźniejsze separacje

#### Black & White Mode
```javascript
accessibility: {
  blackAndWhite: false  // Tryb czarno-biały
}
```
- Biały background
- Czarny tekst
- Brak kolorów (dla nadwrażliwości)

#### Animation Control
```javascript
accessibility: {
  hideAnimations: true  // Wyłącz animacje
}
```
- Bez `transform: translateY()`
- Bez `transition` efektów
- Natychmiastowe feedback

### Size Settings

#### Button Size
```javascript
accessibility: {
  buttonSize: 'medium'  // 'small' | 'medium' | 'large' | 'extra-large'
}
```

| Size | Min Height | Min Width | Padding |
|------|-----------|-----------|---------|
| small | 48px | 100px | md-lg |
| medium | 60px | 120px | lg-xl |
| large | 80px | 160px | xl-xxl |
| extra-large | 100px | 200px | xxl-48px |

#### Text Size
```javascript
accessibility: {
  textSize: 'medium'  // 'small' | 'medium' | 'large' | 'extra-large'
}
```

| Size | Font Size |
|------|-----------|
| small | 14px |
| medium | 16px (default) |
| large | 20px |
| extra-large | 24px |

### Game Settings

#### Timer Disable
```javascript
accessibility: {
  timerDisabled: false  // Wyłącz ograniczenie czasu
}
```
- Użyteczne dla dzieci ze stresem czasowym
- Pozwala skupić się na nauce
- Domyślnie: włączone dla easy mode

## Profil Dziecka

```javascript
childProfile: {
  name: 'Jan',                    // Imię
  age: 6,                         // Wiek
  difficultyLevel: 'easy',        // Poziom trudności
  learningStyle: 'visual',        // visual | auditory | kinesthetic | mixed
  interests: ['zwierzęta'],       // Zainteresowania
  allergies: [],                  // Alergeny (informacja)
  sensitivities: ['flashing']     // Nadwrażliwości
}
```

### Learning Styles
- **Visual** - Uczy się z obrazków i wizualizacji
- **Auditory** - Uczy się ze słuchu i dźwięków
- **Kinesthetic** - Uczy się przez dotyk i ruch
- **Mixed** - Kombinacja wszystkich stylów

### Difficulty Levels

#### Easy (dla najmłodszych)
```javascript
{
  cardsCount: 4,           // Mniej kart/przedmiotów
  timeLimit: null,         // Brak limitu czasu
  displayTime: 3000,       // Dłużej widoczne karty
  feedbackDelay: 500,      // Chwila na odpowiedź
  mistakes: 5              // Tolerancja błędów
}
```

#### Medium (dla średniówki)
```javascript
{
  cardsCount: 8,
  timeLimit: 60,           // 60 sekund
  displayTime: 2000,
  feedbackDelay: 300,
  mistakes: 3
}
```

#### Hard (dla zaawansowanych)
```javascript
{
  cardsCount: 12,
  timeLimit: 30,           // 30 sekund
  displayTime: 1000,
  feedbackDelay: 200,
  mistakes: 2
}
```

## Personalizacja Wyglądu

### Kolory Pastelowe (Default)
```css
--color-primary: #E8D5E8;      /* Fiolet */
--color-secondary: #D5E8E8;    /* Błękit */
--color-success: #D5E8D5;      /* Zieleń */
--color-warning: #E8E8D5;      /* Żółty */
--color-danger: #E8D5D5;       /* Róż */
--color-neutral: #F5F0F5;      /* Tło */
```

### Wysokie Kontrasty
```css
/* Automatycznie stosowane */
border-width: 4px;
box-shadow: 0 4px 8px rgba(0,0,0,0.3);
filter: contrast(1.5) brightness(1.1);
```

### Czarno-białe
```css
background-color: #FFFFFF;
color: #000000;
border: 3px solid #000000;
```

## Język i Wielojęzyczność

### Obsługiwane Języki (200+)
```javascript
SUPPORTED_LANGUAGES = {
  PL: { code: 'pl', name: 'Polski' },
  EN: { code: 'en', name: 'English' },
  DE: { code: 'de', name: 'Deutsch' },
  FR: { code: 'fr', name: 'Français' },
  ES: { code: 'es', name: 'Español' },
  // ... i 195 pozostałych
}
```

### Zmiana Języka
```javascript
const { setLanguage } = useAppStore()
setLanguage('de')  // Zmień na niemiecki
```

### Tłumaczenia
```javascript
const { t } = useTranslation()
return <h1>{t('games.memory')}</h1>  // "Memoria"
```

## Doskonalenie UX dla Autyzmu

### ✅ Zasady projektowania

**Prostota**
- Minimalna liczba elementów
- Jasne cele
- Jednoznaczne instrukcje

**Spójność**
- Te same przyciski w tych samych miejscach
- Konsekwentne kolory
- Powtarzalny flow

**Bezozbywnictwo**
- Brak niespodzianek
- Brak błysku/migotania
- Brak nagłych zmiany

**Feedback**
- Natychmiastowa odpowiedź
- Pozytywne wzmocnienie
- Brak krytyki (tylko "spróbuj jeszcze raz")

**Elastyczność**
- Możliwość wyłączenia elementów
- Adaptacja do tempa dziecka
- Brak presji czasu (opcjonalnie)

### ❌ Co unikać

- ❌ Migające animacje
- ❌ Szybkie przejścia
- ❌ Głośne dźwięki
- ❌ Zbyt wiele opcji
- ❌ Jaskrawe kolory
- ❌ Brak feedback'u
- ❌ Krytyczne komentarze
- ❌ Presja czasu

## Kustomizacja przez Rodzica

### Ustawienia Szkolne

Dla nauczyciela/terapeuty:
```javascript
accessibility: {
  // Wyłącz zabawy dla lepszej koncentracji
  hideAnimations: true,
  
  // Zwiększ rozmiary dla widoczności
  buttonSize: 'extra-large',
  textSize: 'large',
  
  // Brak dźwięków dla spokoju
  soundEnabled: false,
  
  // Brak presji czasu
  timerDisabled: true
}
```

### Ustawienia Domowe

Dla zabawy:
```javascript
accessibility: {
  // Niech się bawi z dźwiękami
  soundEnabled: true,
  soundVolume: 0.5,
  
  // Normalne rozmiary
  buttonSize: 'medium',
  
  // Pozwól na szybkie tempo
  timerDisabled: false
}
```

## Raportowanie Postępu

### Metrics
```javascript
statistics: {
  wordsLearned: 45,         // Słów opanowanych
  gamesPlayed: 12,          // Gier zagranych
  correctAnswers: 98,       // Poprawnych odpowiedzi
  totalQuestions: 112,      // Wszystkich pytań
  
  favoriteGames: [          // Ulubione gry
    'memory_game',
    'matching_game'
  ],
  
  avoidentGames: [          // Unikane gry
    'puzzle_game'           // Dziedzina do pracy
  ]
}
```

### Wykresy
- 📊 Postęp miesięczny (30 dni)
- 📊 Postęp kwartalny (90 dni)
- 📊 Rozkład gier (która gra najczęściej)
- 📊 Dokładność (% poprawnych odpowiedzi)

### Export PDF
```javascript
generatePDFReport({
  childName: 'Jan',
  period: 'January 2024',
  statistics: {...},
  recommendations: [...]
})
```

## Notyfikacje i Osiągnięcia

### Typy Notyfikacji
```javascript
addNotification({
  type: 'milestone',
  message: 'Opanowałeś 10 nowych słów!',
  icon: '🌟'
})

addNotification({
  type: 'encouragement',
  message: 'Świetnie się uczysz!',
  icon: '👏'
})

addNotification({
  type: 'reminder',
  message: 'Czas na nową grę?',
  icon: '🎮'
})
```

### Osiągnięcia
- 🏅 Pierwsze słowo opanowane
- 🏅 10 słów w tygodniu
- 🏅 Ulubiena gra rozegrana 10x
- 🏅 Łącznie 100 punktów
- 🏅 Seria 7 dni

---

**Każde dziecko jest inne - aplikacja dostosowuje się do każdego!**
