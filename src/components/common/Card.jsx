import React from 'react';
import { useAppStore } from '../store/appStore';
import styles from './Card.module.css';

/**
 * Karta do wyświetlania słów i przedmiotów
 * - Przystosowana dla dzieci z autyzmem
 * - Duże obrazy i tekst
 * - Pastelowe kolory
 */
export const Card = ({
  title,
  image,
  description,
  onClick,
  variant = 'normal', // normal, highlight, disabled
  size = 'medium', // small, medium, large
  interactive = false,
  className = ''
}) => {
  const { accessibility } = useAppStore();

  return (
    <div
      className={`${styles.card} ${styles[variant]} ${styles[size]} ${
        accessibility.blackAndWhite ? styles.bw : ''
      } ${accessibility.highContrast ? styles.highContrast : ''} ${
        interactive ? styles.interactive : ''
      } ${className}`}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : 'presentation'}
      tabIndex={interactive ? 0 : -1}
      onKeyPress={
        interactive
          ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()
          : undefined
      }
    >
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      )}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default Card;
