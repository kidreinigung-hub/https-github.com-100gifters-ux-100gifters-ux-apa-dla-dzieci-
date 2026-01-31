// Konfiguracja 20 mini gier dla dzieci z autyzmem

export const GAMES = {
  // Gry już zaimplementowane
  MEMORY: 'memory_game',
  MATCHING: 'matching_game',
  WORD_QUIZ: 'word_quiz',
  
  // Gry interaktywne
  POP_BALLOON: 'pop_balloon',
  BACKGROUND_COLOR: 'background_color',
  CURSOR_FOLLOWER: 'cursor_follower',
  RUNAWAY_BUTTON: 'runaway_button',
  
  // Sortowanie i Logika
  DRAG_DROP_COLORS: 'drag_drop_colors',
  SHADOW_MATCH: 'shadow_match',
  MEMORY_PHOTOS: 'memory_photos',
  ODD_ONE_OUT: 'odd_one_out',
  
  // Dźwięk i Muzyka
  VIRTUAL_PIANO: 'virtual_piano',
  EMOTION_SOUNDBOARD: 'emotion_soundboard',
  SOUND_MATCH: 'sound_match',
  
  // Edukacja i Codzienność
  COUNTING_GAME: 'counting_game',
  VISUAL_PLANNER: 'visual_planner',
  PUZZLE_GAME: 'puzzle_game',
  
  // Kreatywność i Relaks
  CANVAS_PAINTING: 'canvas_painting',
  RAIN_GENERATOR: 'rain_generator',
  BREATHING_CIRCLE: 'breathing_circle',
  
  // Spersonalizowane dla Julii
  FIND_DADDY: 'find_daddy',
  INTERACTIVE_MAP: 'interactive_map',
  HELLO_BUTTON: 'hello_button'
};

export const GAME_CONFIGS = [
  // ========== GAMY JUŻ ZAIMPLEMENTOWANE ==========
  {
    id: GAMES.MEMORY,
    name: { pl: 'Memoria', en: 'Memory Game', de: 'Gedächtnisspiel' },
    description: { pl: 'Gra pamięciowa - znajdź pary identycznych kart', en: 'Find matching pairs of cards' },
    category: 'cognitive',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 4,
    duration: 5,
    learningType: 'visual_memory',
    icon: '🎮'
  },
  {
    id: GAMES.MATCHING,
    name: { pl: 'Dopasowywanie', en: 'Matching Game', de: 'Zuordnungsspiel' },
    description: { pl: 'Połącz przedmioty z ich nazwami', en: 'Match objects with names' },
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 3,
    duration: 5,
    learningType: 'vocabulary',
    icon: '🔗'
  },
  {
    id: GAMES.WORD_QUIZ,
    name: { pl: 'Quiz Słów', en: 'Word Quiz', de: 'Wort-Quiz' },
    description: { pl: 'Zgadnij słowo na podstawie obrazka', en: 'Guess the word from image' },
    category: 'language',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 4,
    duration: 8,
    learningType: 'vocabulary',
    icon: '❓'
  },

  // ========== GAMY INTERAKTYWNE ==========
  {
    id: GAMES.POP_BALLOON,
    name: { pl: 'Pop Balony!', en: 'Pop the Balloon', de: 'Luftballons Platzen' },
    description: { pl: 'Klikaj w balony - usłyszysz "pop"!', en: 'Click balloons - hear pop sound!' },
    category: 'sensory',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 2,
    duration: 3,
    learningType: 'interactive',
    icon: '🎈'
  },
  {
    id: GAMES.BACKGROUND_COLOR,
    name: { pl: 'Zmiana Kolorów', en: 'Background Color', de: 'Hintergrundfarbe' },
    description: { pl: 'Klikaj aby zmienić kolor całego ekranu', en: 'Click to change screen color' },
    category: 'sensory',
    difficulty: ['easy'],
    minAge: 2,
    duration: 3,
    learningType: 'color_learning',
    icon: '🎨'
  },
  {
    id: GAMES.CURSOR_FOLLOWER,
    name: { pl: 'Słodkie Zwierzątko', en: 'Cursor Follower', de: 'Tierverfolgung' },
    description: { pl: 'Kotek podąża za Twoim palcem lub myszką!', en: 'Cat follows your cursor!' },
    category: 'sensory',
    difficulty: ['easy'],
    minAge: 2,
    duration: 5,
    learningType: 'tracking',
    icon: '🐱'
  },
  {
    id: GAMES.RUNAWAY_BUTTON,
    name: { pl: 'Uciekający Przycisk', en: 'Runaway Button', de: 'Fliehende Taste' },
    description: { pl: 'Przycisk ucieka przed Tobą - złap go!', en: 'Button runs away - catch it!' },
    category: 'motor',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 3,
    duration: 4,
    learningType: 'coordination',
    icon: '🏃'
  },

  // ========== SORTOWANIE I LOGIKA ==========
  {
    id: GAMES.DRAG_DROP_COLORS,
    name: { pl: 'Drag & Drop Kolory', en: 'Drag Color Circles', de: 'Farben Ziehen' },
    description: { pl: 'Przeciągnij kolorowe kółka do pasujących kwadratów', en: 'Drag circles to matching squares' },
    category: 'cognitive',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 3,
    duration: 5,
    learningType: 'color_sorting',
    icon: '🎯'
  },
  {
    id: GAMES.SHADOW_MATCH,
    name: { pl: 'Cienie (Shadow Match)', en: 'Shadow Match', de: 'Schattenspiel' },
    description: { pl: 'Przeciągnij przedmiot na jego czarną sylwetkę', en: 'Match objects to their shadows' },
    category: 'cognitive',
    difficulty: ['easy', 'medium'],
    minAge: 3,
    duration: 5,
    learningType: 'shape_recognition',
    icon: '⬛'
  },
  {
    id: GAMES.MEMORY_PHOTOS,
    name: { pl: 'Memory ze Zdjęciami', en: 'Memory with Photos', de: 'Gedächtnis mit Fotos' },
    description: { pl: 'Memory gra ze zdjęciami rodziny i zabawek', en: 'Memory game with family photos' },
    category: 'emotional',
    difficulty: ['easy', 'medium'],
    minAge: 3,
    duration: 5,
    learningType: 'emotional_memory',
    icon: '📸'
  },
  {
    id: GAMES.ODD_ONE_OUT,
    name: { pl: 'Co tu nie pasuje?', en: 'Odd One Out', de: 'Der Außenseiter' },
    description: { pl: '4 obrazki - jeden z innej kategorii. Którdy?', en: 'Find the different image' },
    category: 'cognitive',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 4,
    duration: 5,
    learningType: 'categorization',
    icon: '🤔'
  },

  // ========== DŹWIĘK I MUZYKA ==========
  {
    id: GAMES.VIRTUAL_PIANO,
    name: { pl: 'Wirtualne Pianinko', en: 'Virtual Piano', de: 'Virtuelles Klavier' },
    description: { pl: 'Kolorowe klawisze - każdy wydaje inny dźwięk!', en: 'Colorful keys with different sounds' },
    category: 'sensory',
    difficulty: ['easy'],
    minAge: 2,
    duration: 5,
    learningType: 'music',
    icon: '🎹'
  },
  {
    id: GAMES.EMOTION_SOUNDBOARD,
    name: { pl: 'Soundboard Emocji', en: 'Emotion Soundboard', de: 'Gefühls-Soundboard' },
    description: { pl: 'Twarze emocji - słuchaj i ucz się nazw', en: 'Click emotions to hear their names' },
    category: 'emotional',
    difficulty: ['easy', 'medium'],
    minAge: 3,
    duration: 4,
    learningType: 'emotional_vocabulary',
    icon: '😊'
  },
  {
    id: GAMES.SOUND_MATCH,
    name: { pl: 'Dopasuj Dźwięki', en: 'Sound Match Game', de: 'Ton Zuordnung' },
    description: { pl: 'Usłyszysz dźwięk - wybierz odpowiedni obrazek!', en: 'Hear sound, match to animal' },
    category: 'sensory',
    difficulty: ['easy', 'medium'],
    minAge: 3,
    duration: 5,
    learningType: 'audio_recognition',
    icon: '🔊'
  },

  // ========== EDUKACJA I CODZIENNOŚĆ ==========
  {
    id: GAMES.COUNTING_GAME,
    name: { pl: 'Licznik Przedmiotów', en: 'Counting Objects', de: 'Gegenstände Zählen' },
    description: { pl: 'Klikaj w przedmioty - licznik rośnie!', en: 'Click objects - counter increases' },
    category: 'math',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 3,
    duration: 5,
    learningType: 'numeracy',
    icon: '🔢'
  },
  {
    id: GAMES.VISUAL_PLANNER,
    name: { pl: 'Wizualny Planer', en: 'Visual Planner', de: 'Visueller Planer' },
    description: { pl: 'Odhaczaj czynności - zdobywaj nagrody!', en: 'Check tasks, earn rewards!' },
    category: 'emotional',
    difficulty: ['easy'],
    minAge: 3,
    duration: 10,
    learningType: 'daily_planning',
    icon: '✓'
  },
  {
    id: GAMES.PUZZLE_GAME,
    name: { pl: 'Puzzle 2x2 / 3x3', en: 'Puzzle Game', de: 'Puzzlespiel' },
    description: { pl: 'Przeciągnij kawałki puzzle w prawidłowe miejsca', en: 'Drag puzzle pieces to complete' },
    category: 'cognitive',
    difficulty: ['easy', 'medium', 'hard'],
    minAge: 4,
    duration: 6,
    learningType: 'spatial_reasoning',
    icon: '🧩'
  },

  // ========== KREATYWNOŚĆ I RELAKS ==========
  {
    id: GAMES.CANVAS_PAINTING,
    name: { pl: 'Malowanie Palcem', en: 'Canvas Painting', de: 'Malerei' },
    description: { pl: 'Rysuj na tablicy grubym pędzlem - 4 kolory!', en: 'Draw on canvas with thick brush' },
    category: 'creative',
    difficulty: ['easy'],
    minAge: 2,
    duration: 10,
    learningType: 'creativity',
    icon: '✏️'
  },
  {
    id: GAMES.RAIN_GENERATOR,
    name: { pl: 'Generator Deszczu', en: 'Rain Generator', de: 'Regen Generator' },
    description: { pl: 'Klikaj - pada deszcz lub śnieg!', en: 'Click to create rain or snow' },
    category: 'sensory',
    difficulty: ['easy'],
    minAge: 2,
    duration: 8,
    learningType: 'interactive',
    icon: '🌧️'
  },
  {
    id: GAMES.BREATHING_CIRCLE,
    name: { pl: 'Oddychanie z Kołem', en: 'Breathing Circle', de: 'Atemkreis' },
    description: { pl: 'Animowane koło pomaga się uspokoić - oddychaj z nim!', en: 'Animated circle for calm breathing' },
    category: 'emotional',
    difficulty: ['easy'],
    minAge: 3,
    duration: 5,
    learningType: 'mindfulness',
    icon: '🟢'
  },

  // ========== SPERSONALIZOWANE DLA JULII ==========
  {
    id: GAMES.FIND_DADDY,
    name: { pl: 'Gdzie jest Tata?', en: 'Where is Daddy?', de: 'Wo ist Papa?' },
    description: { pl: 'Znajdź tatę na zdjęciu pokoju - gra dla Ciebie!', en: 'Find daddy in the room photo' },
    category: 'emotional',
    difficulty: ['easy', 'medium'],
    minAge: 3,
    duration: 5,
    learningType: 'visual_search',
    icon: '👨'
  },
  {
    id: GAMES.INTERACTIVE_MAP,
    name: { pl: 'Interaktywna Mapa', en: 'Interactive Map', de: 'Interaktive Karte' },
    description: { pl: 'Essen i Polska - zobacz samolot latający!', en: 'Essen and Poland - watch plane fly' },
    category: 'educational',
    difficulty: ['easy'],
    minAge: 4,
    duration: 5,
    learningType: 'geography',
    icon: '✈️'
  },
  {
    id: GAMES.HELLO_BUTTON,
    name: { pl: 'Przycisk Cześć!', en: 'Hello Button', de: 'Hallo-Taste' },
    description: { pl: 'Kliknij - usłyszysz specjalną wiadomość od taty!', en: 'Click for special message from daddy' },
    category: 'emotional',
    difficulty: ['easy'],
    minAge: 2,
    duration: 2,
    learningType: 'emotional_connection',
    icon: '👋'
  }
];

// Ustawienia trudności dla każdej gry
export const DIFFICULTY_SETTINGS = {
  easy: {
    cardsCount: 4,
    timeLimit: null,
    displayTime: 3000,
    feedbackDelay: 500,
    mistakes: 5
  },
  medium: {
    cardsCount: 8,
    timeLimit: 60,
    displayTime: 2000,
    feedbackDelay: 300,
    mistakes: 3
  },
  hard: {
    cardsCount: 12,
    timeLimit: 30,
    displayTime: 1000,
    feedbackDelay: 200,
    mistakes: 2
  }
};

export default GAME_CONFIGS;
