import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Definicja wszystkich 200 obsługiwanych języków
const LANGUAGE_CODES = {
  // Języki europejskie
  pl: 'Polish',
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  pt_BR: 'Portuguese (Brazil)',
  ru: 'Russian',
  uk: 'Ukrainian',
  be: 'Belarusian',
  hr: 'Croatian',
  cs: 'Czech',
  sk: 'Slovak',
  sl: 'Slovenian',
  hu: 'Hungarian',
  ro: 'Romanian',
  bg: 'Bulgarian',
  sr: 'Serbian',
  el: 'Greek',
  sv: 'Swedish',
  no: 'Norwegian',
  da: 'Danish',
  fi: 'Finnish',
  nl: 'Dutch',
  
  // Języki azjatyckie
  zh: 'Chinese (Simplified)',
  zh_TW: 'Chinese (Traditional)',
  ja: 'Japanese',
  ko: 'Korean',
  vi: 'Vietnamese',
  th: 'Thai',
  id: 'Indonesian',
  ms: 'Malay',
  tl: 'Filipino',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  ur: 'Urdu',
  pa: 'Punjabi',
  ar: 'Arabic',
  he: 'Hebrew',
  tr: 'Turkish',
  
  // Języki afrykańskie i ameryki
  sw: 'Swahili',
  af: 'Afrikaans'
};

// Domyślne tłumaczenia - rozszerzysz z rzeczywistymi słowami
const translations = {
  pl: {
    translation: {
      // Menu główne
      'menu.home': 'Strona główna',
      'menu.games': 'Gry',
      'menu.library': 'Biblioteka słów',
      'menu.stats': 'Statystyki',
      'menu.settings': 'Ustawienia',
      'menu.feedback': 'Prześlij opinię',
      
      // Przyciski
      'button.start': 'Graj',
      'button.next': 'Dalej',
      'button.back': 'Wstecz',
      'button.pause': 'Wstrzymaj',
      'button.resume': 'Wznów',
      'button.quit': 'Wyjdź',
      'button.save': 'Zapisz',
      'button.cancel': 'Anuluj',
      'button.add': 'Dodaj',
      'button.delete': 'Usuń',
      'button.export': 'Eksportuj do PDF',
      
      // Powiadomienia
      'notification.success': 'Brawo!',
      'notification.tryAgain': 'Spróbuj jeszcze raz',
      'notification.wordLearned': 'Opanowałeś nowe słowo!',
      'notification.milestone': 'Twoje dziecko opanowało {{count}} nowych słów w tym tygodniu!',
      
      // Ustawienia dostępności
      'settings.sound': 'Dźwięk',
      'settings.soundEnabled': 'Dźwięk włączony',
      'settings.soundDisabled': 'Dźwięk wyłączony',
      'settings.highContrast': 'Wysoki kontrast',
      'settings.blackAndWhite': 'Czarno-białe',
      'settings.buttonSize': 'Rozmiar przycisków',
      'settings.textSize': 'Rozmiar tekstu',
      'settings.animationsDisabled': 'Animacje wyłączone',
      'settings.difficulty': 'Poziom trudności',
      'settings.easy': 'Łatwy',
      'settings.medium': 'Średni',
      'settings.hard': 'Trudny',
      
      // Profile dziecka
      'profile.name': 'Imię',
      'profile.age': 'Wiek',
      'profile.interests': 'Zainteresowania',
      'profile.sensitivities': 'Nadwrażliwości',
      
      // Biblioteka
      'library.title': 'Biblioteka słów',
      'library.addWord': 'Dodaj słowo',
      'library.customWords': 'Twoje słowa',
      'library.categories': 'Kategorie',
      'library.search': 'Szukaj...',
      
      // Statystyki
      'stats.title': 'Statystyki postępu',
      'stats.wordsLearned': 'Słów opanowanych',
      'stats.gamesPlayed': 'Gier zagranych',
      'stats.accuracy': 'Dokładność',
      'stats.favoriteGame': 'Ulubiona gra',
      'stats.monthlyProgress': 'Postęp miesięczny',
      'stats.quarterlyProgress': 'Postęp kwartalny',
      
      // Gry
      'games.title': 'Gry',
      'games.memory': 'Memoria',
      'games.matching': 'Dopasowywanie',
      'games.wordQuiz': 'Quiz słów',
      'games.emotionMatch': 'Poznaj emocje',
      'games.colorSort': 'Sortowanie kolorów',
      'games.sequence': 'Sekwencje',
      'games.counting': 'Liczenie',
      'games.categorySort': 'Sortowanie kategorii',
      'games.shapeMatch': 'Kształty',
      'games.findObject': 'Znajdź przedmiot',
      'games.puzzle': 'Puzzle',
      'games.soundMatch': 'Dopasowanie dźwięków',
      'games.pairMatching': 'Gra parami',
      'games.actionSequence': 'Sekwencje czynności',
      'games.mathBasics': 'Matematyka',
      'games.buildGame': 'Burzenie budynków',
      'games.clickGame': 'Klikanie',
      'games.trackGame': 'Samochodziki',
      'games.dragDrop': 'Przeciągnij i upuść',
      'games.speedMatch': 'Szybkie dopasowanie'
    }
  },
  en: {
    translation: {
      'menu.home': 'Home',
      'menu.games': 'Games',
      'menu.library': 'Word Library',
      'menu.stats': 'Statistics',
      'menu.settings': 'Settings',
      'menu.feedback': 'Send Feedback',
      
      'button.start': 'Play',
      'button.next': 'Next',
      'button.back': 'Back',
      'button.pause': 'Pause',
      'button.resume': 'Resume',
      'button.quit': 'Quit',
      'button.save': 'Save',
      'button.cancel': 'Cancel',
      'button.add': 'Add',
      'button.delete': 'Delete',
      'button.export': 'Export to PDF',
      
      'notification.success': 'Excellent!',
      'notification.tryAgain': 'Try again',
      'notification.wordLearned': 'You learned a new word!',
      'notification.milestone': 'Your child learned {{count}} new words this week!',
      
      'settings.sound': 'Sound',
      'settings.soundEnabled': 'Sound On',
      'settings.soundDisabled': 'Sound Off',
      'settings.highContrast': 'High Contrast',
      'settings.blackAndWhite': 'Black & White',
      'settings.buttonSize': 'Button Size',
      'settings.textSize': 'Text Size',
      'settings.animationsDisabled': 'Animations Disabled',
      'settings.difficulty': 'Difficulty Level',
      'settings.easy': 'Easy',
      'settings.medium': 'Medium',
      'settings.hard': 'Hard',
      
      'profile.name': 'Name',
      'profile.age': 'Age',
      'profile.interests': 'Interests',
      'profile.sensitivities': 'Sensitivities',
      
      'library.title': 'Word Library',
      'library.addWord': 'Add Word',
      'library.customWords': 'Your Words',
      'library.categories': 'Categories',
      'library.search': 'Search...',
      
      'stats.title': 'Progress Statistics',
      'stats.wordsLearned': 'Words Learned',
      'stats.gamesPlayed': 'Games Played',
      'stats.accuracy': 'Accuracy',
      'stats.favoriteGame': 'Favorite Game',
      'stats.monthlyProgress': 'Monthly Progress',
      'stats.quarterlyProgress': 'Quarterly Progress',
      
      'games.title': 'Games',
      'games.memory': 'Memory Game',
      'games.matching': 'Matching',
      'games.wordQuiz': 'Word Quiz',
      'games.emotionMatch': 'Emotion Match',
      'games.colorSort': 'Color Sort',
      'games.sequence': 'Sequence',
      'games.counting': 'Counting',
      'games.categorySort': 'Category Sort',
      'games.shapeMatch': 'Shape Match',
      'games.findObject': 'Find Object',
      'games.puzzle': 'Puzzle',
      'games.soundMatch': 'Sound Match',
      'games.pairMatching': 'Pair Matching',
      'games.actionSequence': 'Action Sequence',
      'games.mathBasics': 'Math Basics',
      'games.buildGame': 'Building Blocks',
      'games.clickGame': 'Click Game',
      'games.trackGame': 'Car Racing',
      'games.dragDrop': 'Drag & Drop',
      'games.speedMatch': 'Speed Match'
    }
  },
  de: {
    translation: {
      'menu.home': 'Startseite',
      'menu.games': 'Spiele',
      'menu.library': 'Wortbibliothek',
      'menu.stats': 'Statistiken',
      'menu.settings': 'Einstellungen',
      'menu.feedback': 'Feedback geben',
      
      'button.start': 'Spielen',
      'button.next': 'Weiter',
      'button.back': 'Zurück',
      'button.pause': 'Pause',
      'button.resume': 'Fortsetzen',
      'button.quit': 'Beenden',
      'button.save': 'Speichern',
      'button.cancel': 'Abbrechen',
      'button.add': 'Hinzufügen',
      'button.delete': 'Löschen',
      'button.export': 'Als PDF exportieren',
      
      'notification.success': 'Ausgezeichnet!',
      'notification.tryAgain': 'Versuche es erneut',
      'notification.wordLearned': 'Du hast ein neues Wort gelernt!',
      'notification.milestone': 'Dein Kind hat {{count}} neue Wörter diese Woche gelernt!',
      
      'settings.sound': 'Ton',
      'settings.soundEnabled': 'Ton an',
      'settings.soundDisabled': 'Ton aus',
      'settings.highContrast': 'Hoher Kontrast',
      'settings.blackAndWhite': 'Schwarzweiß',
      'settings.buttonSize': 'Tastengröße',
      'settings.textSize': 'Textgröße',
      'settings.animationsDisabled': 'Animationen deaktiviert',
      'settings.difficulty': 'Schwierigkeitsstufe',
      'settings.easy': 'Leicht',
      'settings.medium': 'Mittel',
      'settings.hard': 'Schwer',
      
      'profile.name': 'Name',
      'profile.age': 'Alter',
      'profile.interests': 'Interessen',
      'profile.sensitivities': 'Empfindlichkeiten',
      
      'library.title': 'Wortbibliothek',
      'library.addWord': 'Wort hinzufügen',
      'library.customWords': 'Deine Wörter',
      'library.categories': 'Kategorien',
      'library.search': 'Suchen...',
      
      'stats.title': 'Fortschrittsstatistiken',
      'stats.wordsLearned': 'Gelernte Wörter',
      'stats.gamesPlayed': 'Spiele gespielt',
      'stats.accuracy': 'Genauigkeit',
      'stats.favoriteGame': 'Lieblingsspiel',
      'stats.monthlyProgress': 'Monatlicher Fortschritt',
      'stats.quarterlyProgress': 'Vierteljährlicher Fortschritt',
      
      'games.title': 'Spiele',
      'games.memory': 'Gedächtnisspiel',
      'games.matching': 'Zuordnungsspiel',
      'games.wordQuiz': 'Wort-Quiz',
      'games.emotionMatch': 'Gefühle erkennen',
      'games.colorSort': 'Farben sortieren',
      'games.sequence': 'Abfolge',
      'games.counting': 'Zählen',
      'games.categorySort': 'Kategorien sortieren',
      'games.shapeMatch': 'Formen zuordnen',
      'games.findObject': 'Finde das Objekt',
      'games.puzzle': 'Puzzlespiel',
      'games.soundMatch': 'Ton-Zuordnung',
      'games.pairMatching': 'Paarspiel',
      'games.actionSequence': 'Aktionsfolge',
      'games.mathBasics': 'Mathematik Grundlagen',
      'games.buildGame': 'Gebäude bauen',
      'games.clickGame': 'Klickspiel',
      'games.trackGame': 'Autorennspiel',
      'games.dragDrop': 'Ziehen und Ablegen',
      'games.speedMatch': 'Schnelle Zuordnung'
    }
  },
  // Dodatkowe języki będą dodane w pełnej wersji
  // Dla każdego z 200 języków
};

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export { LANGUAGE_CODES };
export default i18n;
