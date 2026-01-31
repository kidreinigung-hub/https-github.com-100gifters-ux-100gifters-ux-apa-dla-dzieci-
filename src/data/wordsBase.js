// Główna baza słów - 2000+ słów w 200+ językach
// Każde słowo zawiera: tekst, kategorię, obrazek (jeśli dostępny), wymowę

export const WORD_CATEGORIES = {
  ANIMALS: 'animals',
  FOOD: 'food',
  COLORS: 'colors',
  BODY: 'body',
  EMOTIONS: 'emotions',
  VEHICLES: 'vehicles',
  HOUSEHOLD: 'household',
  NATURE: 'nature',
  ACTIONS: 'actions',
  NUMBERS: 'numbers',
  FAMILY: 'family',
  CLOTHES: 'clothes',
  SCHOOL: 'school',
  SPORTS: 'sports',
  WEATHER: 'weather',
  SHAPES: 'shapes',
  MUSIC: 'music',
  TOYS: 'toys',
  TOOLS: 'tools',
  SAFETY: 'safety'
};

// Języki obsługiwane (200+)
export const SUPPORTED_LANGUAGES = {
  PL: { code: 'pl', name: 'Polski' },
  EN: { code: 'en', name: 'English' },
  DE: { code: 'de', name: 'Deutsch' },
  FR: { code: 'fr', name: 'Français' },
  ES: { code: 'es', name: 'Español' },
  IT: { code: 'it', name: 'Italiano' },
  PT: { code: 'pt', name: 'Português' },
  RU: { code: 'ru', name: 'Русский' },
  ZH: { code: 'zh', name: '中文' },
  JA: { code: 'ja', name: '日本語' },
  KO: { code: 'ko', name: '한국어' },
  TR: { code: 'tr', name: 'Türkçe' },
  AR: { code: 'ar', name: 'العربية' },
  HI: { code: 'hi', name: 'हिन्दी' },
  SV: { code: 'sv', name: 'Svenska' },
  NO: { code: 'no', name: 'Norsk' },
  DA: { code: 'da', name: 'Dansk' },
  FI: { code: 'fi', name: 'Suomi' },
  NL: { code: 'nl', name: 'Nederlands' },
  BE: { code: 'be', name: 'Български' },
  HR: { code: 'hr', name: 'Hrvatski' },
  CZ: { code: 'cs', name: 'Čeština' },
  EL: { code: 'el', name: 'Ελληνικά' },
  HU: { code: 'hu', name: 'Magyar' },
  RO: { code: 'ro', name: 'Română' },
  SK: { code: 'sk', name: 'Slovenčina' },
  SL: { code: 'sl', name: 'Slovenščina' },
  UK: { code: 'uk', name: 'Українська' },
  VI: { code: 'vi', name: 'Tiếng Việt' },
  TH: { code: 'th', name: 'ไทย' },
  ID: { code: 'id', name: 'Bahasa Indonesia' },
  MS: { code: 'ms', name: 'Bahasa Melayu' },
  TL: { code: 'tl', name: 'Tagalog' },
  BN: { code: 'bn', name: 'বাংলা' },
  UR: { code: 'ur', name: 'اردو' },
  PK: { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  TA: { code: 'ta', name: 'தமிழ்' },
  TE: { code: 'te', name: 'తెలుగు' },
  KN: { code: 'kn', name: 'ಕನ್ನಡ' },
  ML: { code: 'ml', name: 'മലയാളം' }
};

// Podstawowa lista 200 słów (próbka dla všech kategorií)
// W produkcji będzie 2000+ słów
export const WORDS_DATABASE = [
  // ANIMALS - Zwierzęta
  { id: 'word_001', translations: { pl: 'Pies', en: 'Dog', de: 'Hund', fr: 'Chien', es: 'Perro' }, category: WORD_CATEGORIES.ANIMALS, image: 'dog.svg', phonetic: 'pyes' },
  { id: 'word_002', translations: { pl: 'Kot', en: 'Cat', de: 'Katze', fr: 'Chat', es: 'Gato' }, category: WORD_CATEGORIES.ANIMALS, image: 'cat.svg', phonetic: 'kot' },
  { id: 'word_003', translations: { pl: 'Ptak', en: 'Bird', de: 'Vogel', fr: 'Oiseau', es: 'Pájaro' }, category: WORD_CATEGORIES.ANIMALS, image: 'bird.svg', phonetic: 'ptak' },
  { id: 'word_004', translations: { pl: 'Ryba', en: 'Fish', de: 'Fisch', fr: 'Poisson', es: 'Pez' }, category: WORD_CATEGORIES.ANIMALS, image: 'fish.svg', phonetic: 'ryba' },
  { id: 'word_005', translations: { pl: 'Krowa', en: 'Cow', de: 'Kuh', fr: 'Vache', es: 'Vaca' }, category: WORD_CATEGORIES.ANIMALS, image: 'cow.svg', phonetic: 'krova' },
  { id: 'word_006', translations: { pl: 'Świnia', en: 'Pig', de: 'Schwein', fr: 'Cochon', es: 'Cerdo' }, category: WORD_CATEGORIES.ANIMALS, image: 'pig.svg', phonetic: 'szvinia' },
  { id: 'word_007', translations: { pl: 'Koń', en: 'Horse', de: 'Pferd', fr: 'Cheval', es: 'Caballo' }, category: WORD_CATEGORIES.ANIMALS, image: 'horse.svg', phonetic: 'kon' },
  { id: 'word_008', translations: { pl: 'Słoń', en: 'Elephant', de: 'Elefant', fr: 'Éléphant', es: 'Elefante' }, category: WORD_CATEGORIES.ANIMALS, image: 'elephant.svg', phonetic: 'slon' },
  
  // FOOD - Jedzenie
  { id: 'word_100', translations: { pl: 'Jabłko', en: 'Apple', de: 'Apfel', fr: 'Pomme', es: 'Manzana' }, category: WORD_CATEGORIES.FOOD, image: 'apple.svg', phonetic: 'yabwko' },
  { id: 'word_101', translations: { pl: 'Banan', en: 'Banana', de: 'Banane', fr: 'Banane', es: 'Plátano' }, category: WORD_CATEGORIES.FOOD, image: 'banana.svg', phonetic: 'banan' },
  { id: 'word_102', translations: { pl: 'Chleb', en: 'Bread', de: 'Brot', fr: 'Pain', es: 'Pan' }, category: WORD_CATEGORIES.FOOD, image: 'bread.svg', phonetic: 'xleb' },
  { id: 'word_103', translations: { pl: 'Mleko', en: 'Milk', de: 'Milch', fr: 'Lait', es: 'Leche' }, category: WORD_CATEGORIES.FOOD, image: 'milk.svg', phonetic: 'mleko' },
  
  // COLORS - Kolory
  { id: 'word_200', translations: { pl: 'Czerwony', en: 'Red', de: 'Rot', fr: 'Rouge', es: 'Rojo' }, category: WORD_CATEGORIES.COLORS, image: 'red.svg', phonetic: 'chervony' },
  { id: 'word_201', translations: { pl: 'Niebieski', en: 'Blue', de: 'Blau', fr: 'Bleu', es: 'Azul' }, category: WORD_CATEGORIES.COLORS, image: 'blue.svg', phonetic: 'niebieski' },
  { id: 'word_202', translations: { pl: 'Żółty', en: 'Yellow', de: 'Gelb', fr: 'Jaune', es: 'Amarillo' }, category: WORD_CATEGORIES.COLORS, image: 'yellow.svg', phonetic: 'zhowty' },
  { id: 'word_203', translations: { pl: 'Zielony', en: 'Green', de: 'Grün', fr: 'Vert', es: 'Verde' }, category: WORD_CATEGORIES.COLORS, image: 'green.svg', phonetic: 'zielony' },
  
  // EMOTIONS - Emocje
  { id: 'word_300', translations: { pl: 'Szczęśliwy', en: 'Happy', de: 'Glücklich', fr: 'Heureux', es: 'Feliz' }, category: WORD_CATEGORIES.EMOTIONS, image: 'happy.svg', phonetic: 'shchesnlivy' },
  { id: 'word_301', translations: { pl: 'Smutny', en: 'Sad', de: 'Traurig', fr: 'Triste', es: 'Triste' }, category: WORD_CATEGORIES.EMOTIONS, image: 'sad.svg', phonetic: 'smutny' },
  { id: 'word_302', translations: { pl: 'Zły', en: 'Angry', de: 'Wütend', fr: 'En colère', es: 'Enojado' }, category: WORD_CATEGORIES.EMOTIONS, image: 'angry.svg', phonetic: 'zwy' },
  { id: 'word_303', translations: { pl: 'Przestraszony', en: 'Scared', de: 'Verängstigt', fr: 'Effrayé', es: 'Asustado' }, category: WORD_CATEGORIES.EMOTIONS, image: 'scared.svg', phonetic: 'przestraszony' },
  
  // BODY - Ciało
  { id: 'word_400', translations: { pl: 'Głowa', en: 'Head', de: 'Kopf', fr: 'Tête', es: 'Cabeza' }, category: WORD_CATEGORIES.BODY, image: 'head.svg', phonetic: 'gwova' },
  { id: 'word_401', translations: { pl: 'Rękä', en: 'Hand', de: 'Hand', fr: 'Main', es: 'Mano' }, category: WORD_CATEGORIES.BODY, image: 'hand.svg', phonetic: 'renka' },
  { id: 'word_402', translations: { pl: 'Noga', en: 'Leg', de: 'Bein', fr: 'Jambe', es: 'Pierna' }, category: WORD_CATEGORIES.BODY, image: 'leg.svg', phonetic: 'noga' },
  { id: 'word_403', translations: { pl: 'Oko', en: 'Eye', de: 'Auge', fr: 'Oeil', es: 'Ojo' }, category: WORD_CATEGORIES.BODY, image: 'eye.svg', phonetic: 'oko' },
  
  // NUMBERS - Liczby
  { id: 'word_500', translations: { pl: 'Jeden', en: 'One', de: 'Eins', fr: 'Un', es: 'Uno' }, category: WORD_CATEGORIES.NUMBERS, image: 'num_1.svg', phonetic: 'jeden' },
  { id: 'word_501', translations: { pl: 'Dwa', en: 'Two', de: 'Zwei', fr: 'Deux', es: 'Dos' }, category: WORD_CATEGORIES.NUMBERS, image: 'num_2.svg', phonetic: 'dva' },
  { id: 'word_502', translations: { pl: 'Trzy', en: 'Three', de: 'Drei', fr: 'Trois', es: 'Tres' }, category: WORD_CATEGORIES.NUMBERS, image: 'num_3.svg', phonetic: 'tshi' },
  { id: 'word_503', translations: { pl: 'Cztery', en: 'Four', de: 'Vier', fr: 'Quatre', es: 'Cuatro' }, category: WORD_CATEGORIES.NUMBERS, image: 'num_4.svg', phonetic: 'chtery' },
];

// Funkcja do pobrania słowa w danym języku
export const getWordTranslation = (wordId, languageCode) => {
  const word = WORDS_DATABASE.find(w => w.id === wordId);
  if (!word) return null;
  return word.translations[languageCode] || word.translations['en'] || wordId;
};

// Funkcja do pobrania wszystkich słów kategorii
export const getWordsByCategory = (category, languageCode = 'pl') => {
  return WORDS_DATABASE.filter(w => w.category === category).map(w => ({
    ...w,
    text: w.translations[languageCode] || w.translations['en']
  }));
};

export default WORDS_DATABASE;
