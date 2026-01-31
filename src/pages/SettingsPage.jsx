import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import { LANGUAGE_CODES } from '../i18n/config';
import ButtonBig from '../components/common/ButtonBig';
import styles from './SettingsPage.module.css';

export const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const {
    language,
    setLanguage,
    accessibility,
    updateAccessibility,
    childProfile,
    updateChildProfile
  } = useAppStore();

  const [profile, setProfile] = useState(childProfile);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleAccessibilityToggle = (key) => {
    updateAccessibility({
      [key]: !accessibility[key]
    });
  };

  const handleAccessibilityChange = (key, value) => {
    updateAccessibility({
      [key]: value
    });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    });
  };

  const handleSaveProfile = () => {
    updateChildProfile(profile);
    alert('Profil zapisany!');
  };

  const languageOptions = Object.entries(LANGUAGE_CODES).slice(0, 30); // Pokazuje pierwsze 30 języków

  return (
    <div className={styles.settingsPage}>
      <h2 className={styles.title}>⚙️ {t('menu.settings')}</h2>

      {/* PERSONALIZACJA PROFILU */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>👤 Profil dziecka</h3>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('profile.name')}:
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Imię dziecka"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('profile.age')}:
          </label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleProfileChange}
            min="1"
            max="18"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Poziom trudności:
          </label>
          <select
            name="difficultyLevel"
            value={profile.difficultyLevel}
            onChange={handleProfileChange}
            className={styles.select}
          >
            <option value="easy">{t('settings.easy')}</option>
            <option value="medium">{t('settings.medium')}</option>
            <option value="hard">{t('settings.hard')}</option>
          </select>
        </div>

        <ButtonBig variant="success" onClick={handleSaveProfile}>
          💾 {t('button.save')}
        </ButtonBig>
      </section>

      {/* JĘZYK */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🌍 Język</h3>
        <div className={styles.languageSelector}>
          {languageOptions.map(([code, name]) => (
            <button
              key={code}
              className={`${styles.langButton} ${
                language === code ? styles.active : ''
              }`}
              onClick={() => handleLanguageChange(code)}
              title={name}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* DOSTĘPNOŚĆ - DŹWIĘK */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🔊 Dźwięk</h3>
        
        <div className={styles.toggleGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={accessibility.soundEnabled}
              onChange={() => handleAccessibilityToggle('soundEnabled')}
              className={styles.checkbox}
            />
            <span>{t('settings.soundEnabled')}</span>
          </label>
        </div>

        {accessibility.soundEnabled && (
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Głośność (0-100):
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(accessibility.soundVolume * 100)}
              onChange={(e) =>
                handleAccessibilityChange('soundVolume', parseInt(e.target.value) / 100)
              }
              className={styles.slider}
            />
            <span className={styles.sliderValue}>
              {Math.round(accessibility.soundVolume * 100)}%
            </span>
          </div>
        )}
      </section>

      {/* DOSTĘPNOŚĆ - WIZUALNA */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>👀 Zmysł wzroku</h3>

        <div className={styles.toggleGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={accessibility.hideAnimations}
              onChange={() => handleAccessibilityToggle('hideAnimations')}
              className={styles.checkbox}
            />
            <span>Wyłącz animacje (bezpieczniej dla wrażliwych)</span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={() => handleAccessibilityToggle('highContrast')}
              className={styles.checkbox}
            />
            <span>{t('settings.highContrast')}</span>
          </label>
        </div>

        <div className={styles.toggleGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={accessibility.blackAndWhite}
              onChange={() => handleAccessibilityToggle('blackAndWhite')}
              className={styles.checkbox}
            />
            <span>{t('settings.blackAndWhite')}</span>
          </label>
        </div>
      </section>

      {/* DOSTĘPNOŚĆ - ROZMIARY */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>📏 Rozmiary i tekst</h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('settings.buttonSize')}:
          </label>
          <select
            value={accessibility.buttonSize}
            onChange={(e) =>
              handleAccessibilityChange('buttonSize', e.target.value)
            }
            className={styles.select}
          >
            <option value="small">Mały</option>
            <option value="medium">Średni</option>
            <option value="large">Duży</option>
            <option value="extra-large">Bardzo duży</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('settings.textSize')}:
          </label>
          <select
            value={accessibility.textSize}
            onChange={(e) =>
              handleAccessibilityChange('textSize', e.target.value)
            }
            className={styles.select}
          >
            <option value="small">Mały</option>
            <option value="medium">Średni</option>
            <option value="large">Duży</option>
            <option value="extra-large">Bardzo duży</option>
          </select>
        </div>
      </section>

      {/* GRY I ZABAWY */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>🎮 Gry i zabawy</h3>

        <div className={styles.toggleGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={accessibility.timerDisabled}
              onChange={() => handleAccessibilityToggle('timerDisabled')}
              className={styles.checkbox}
            />
            <span>Wyłącz timery (mniej stresu)</span>
          </label>
        </div>
      </section>

      {/* INFORMACJE */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>ℹ️ O aplikacji</h3>
        <div className={styles.infoCard}>
          <p>Autyzm - Asystent dla Dzieci v1.0</p>
          <p>Aplikacja wspierająca rozwój dzieci z autyzmem</p>
          <p>Zawiera 20 gier edukacyjnych i bibliotekę 2000+ słów</p>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
