import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import { WORDS_DATABASE, WORD_CATEGORIES, getWordsByCategory } from '../data/wordsBase';
import Card from '../components/common/Card';
import ButtonBig from '../components/common/ButtonBig';
import styles from './GamesPage.module.css';

export const LibraryPage = () => {
  const { t } = useTranslation();
  const { language, customWords } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Object.values(WORD_CATEGORIES);

  const getWords = () => {
    if (selectedCategory) {
      return getWordsByCategory(selectedCategory, language);
    }
    return WORDS_DATABASE.map(w => ({
      ...w,
      text: w.translations[language] || w.translations['en']
    }));
  };

  const filteredWords = getWords().filter(word =>
    word.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.libraryPage}>
      <h2 className={styles.title}>📚 {t('library.title')}</h2>

      {/* Wyszukiwanie */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder={t('library.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Szukaj słów"
        />
      </div>

      {/* Kategorie */}
      <div className={styles.categorySelector}>
        <button
          className={`${styles.categoryButton} ${!selectedCategory ? styles.active : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          Wszystkie
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryButton} ${
              selectedCategory === cat ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista słów */}
      <div className={styles.wordsList}>
        {filteredWords.length > 0 ? (
          filteredWords.map((word) => (
            <Card
              key={word.id}
              title={word.text}
              image={word.image ? `assets/images/${word.image}` : null}
              description={word.phonetic}
              size="medium"
            />
          ))
        ) : (
          <p className={styles.noResults}>
            Brak słów spełniających kryteria wyszukiwania 😢
          </p>
        )}
      </div>

      {/* Statystyka */}
      <div className={styles.stats}>
        <p className={styles.statsText}>
          📊 Łącznie: {filteredWords.length} słów
        </p>
      </div>
    </div>
  );
};

export default LibraryPage;
