// Funkcje pomocnicze dla aplikacji

/**
 * Shuffle array (Fisher-Yates)
 */
export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Get random items from array
 */
export const getRandomItems = (array, count) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Generate unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Delay execution (promise-based)
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

/**
 * Format time (mm:ss)
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Play sound (if enabled)
 */
export const playSound = (soundName, volume = 1) => {
  try {
    // TODO: Implement sound playing
    console.log(`Playing sound: ${soundName} at volume: ${volume}`);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

/**
 * Generate PDF report
 */
export const generatePDFReport = async (data) => {
  try {
    // TODO: Implement PDF generation using jsPDF
    console.log('Generating PDF report:', data);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

/**
 * Speak text (text-to-speech)
 */
export const speakText = (text, language = 'pl-PL') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  }
};

/**
 * Check if device is touch-enabled
 */
export const isTouchDevice = () => {
  return (
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  );
};

/**
 * Get device orientation
 */
export const getOrientation = () => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

/**
 * Save data to localStorage
 */
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Load data from localStorage
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Clear localStorage
 */
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export default {
  shuffleArray,
  getRandomItems,
  generateId,
  delay,
  calculateAccuracy,
  formatTime,
  playSound,
  generatePDFReport,
  speakText,
  isTouchDevice,
  getOrientation,
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage
};
