import create from 'zustand';
import { persist } from 'zustand/middleware';

// Store główny aplikacji - ustawienia, profile dziecka, statystyki
export const useAppStore = create(
  persist(
    (set, get) => ({
      // Język
      language: 'pl',
      setLanguage: (lang) => set({ language: lang }),

      // Ustawienia dostępności
      accessibility: {
        soundEnabled: true,
        highContrast: false,
        blackAndWhite: false,
        largeButtons: false,
        hideAnimations: true,
        timerDisabled: false,
        buttonSize: 'medium', // small, medium, large, extra-large
        textSize: 'medium', // small, medium, large, extra-large
        soundVolume: 0.7,
        colorMode: 'pastel' // pastel, highcontrast, bw
      },
      updateAccessibility: (settings) =>
        set((state) => ({
          accessibility: { ...state.accessibility, ...settings }
        })),

      // Profil dziecka / rejestr
      childProfile: {
        name: '',
        age: 0,
        difficultyLevel: 'easy', // easy, medium, hard
        learningStyle: 'visual', // visual, auditory, kinesthetic, mixed
        interests: [],
        allergies: [],
        sensitivities: []
      },
      updateChildProfile: (profile) =>
        set({ childProfile: profile }),

      // Biblioteka słów - własne słowa użytkownika
      customWords: [],
      addCustomWord: (word) =>
        set((state) => ({
          customWords: [...state.customWords, { ...word, id: `custom_${Date.now()}` }]
        })),
      deleteCustomWord: (wordId) =>
        set((state) => ({
          customWords: state.customWords.filter((w) => w.id !== wordId)
        })),

      // Własne kategorie
      customCategories: [],
      addCustomCategory: (category) =>
        set((state) => ({
          customCategories: [...state.customCategories, { ...category, id: `cat_${Date.now()}` }]
        })),

      // Własne gry
      customGames: [],
      addCustomGame: (game) =>
        set((state) => ({
          customGames: [...state.customGames, { ...game, id: `game_${Date.now()}` }]
        })),

      // Statystyki nauki
      statistics: {
        wordsLearned: [],
        gamesPlayed: [],
        totalScore: 0,
        streakDays: 0,
        lastPlayDate: null
      },
      recordGameSession: (sessionData) =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            gamesPlayed: [
              ...state.statistics.gamesPlayed,
              {
                ...sessionData,
                timestamp: new Date().toISOString()
              }
            ],
            lastPlayDate: new Date().toISOString()
          }
        })),
      recordWordLearned: (wordId) =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            wordsLearned: [...new Set([...state.statistics.wordsLearned, wordId])]
          }
        })),

      // Powiadomienia
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: `notif_${Date.now()}` }
          ]
        })),
      removeNotification: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== notificationId)
        }))
    }),
    {
      name: 'autism-app-store',
      partialize: (state) =>
        ({
          language: state.language,
          accessibility: state.accessibility,
          childProfile: state.childProfile,
          customWords: state.customWords,
          customCategories: state.customCategories,
          customGames: state.customGames,
          statistics: state.statistics,
          notifications: state.notifications
        })
    }
  )
);

// Store dla bieżącej gry
export const useGameStore = create((set) => ({
  currentGame: null,
  gameState: 'idle', // idle, playing, paused, finished
  score: 0,
  mistakes: 0,
  startTime: null,
  endTime: null,
  
  startGame: (gameId) =>
    set({
      currentGame: gameId,
      gameState: 'playing',
      score: 0,
      mistakes: 0,
      startTime: Date.now()
    }),
  
  endGame: (finalScore) =>
    set((state) => ({
      gameState: 'finished',
      score: finalScore,
      endTime: Date.now()
    })),
  
  updateScore: (points) =>
    set((state) => ({
      score: state.score + points
    })),
  
  updateMistakes: (count) =>
    set((state) => ({
      mistakes: state.mistakes + count
    })),
  
  resetGame: () =>
    set({
      currentGame: null,
      gameState: 'idle',
      score: 0,
      mistakes: 0,
      startTime: null,
      endTime: null
    })
}));

export default useAppStore;
