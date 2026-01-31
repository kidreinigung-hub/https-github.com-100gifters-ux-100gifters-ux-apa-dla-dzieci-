import React from 'react';
import { useAppStore } from '../store/appStore';
import styles from './ButtonBig.module.css';

/**
 * Duży przycisk przyjazny dla dzieci z autyzmem
 * - Duże rozmiary
 * - Pastelowe kolory
 * - Bez ostrej animacji
 * - Wsparcie dla dotykowych i myszki
 */
export const ButtonBig = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, success, danger, neutral
  disabled = false,
  ariaLabel,
  className = ''
}) => {
  const { accessibility } = useAppStore();

  const getButtonClass = () => {
    let baseClass = `${styles.button} ${styles[variant]}`;
    
    if (accessibility.largeButtons) {
      baseClass += ` ${styles.sizeLarge}`;
    } else if (accessibility.buttonSize === 'extra-large') {
      baseClass += ` ${styles.sizeExtraLarge}`;
    } else if (accessibility.buttonSize === 'small') {
      baseClass += ` ${styles.sizeSmall}`;
    }
    
    if (disabled) {
      baseClass += ` ${styles.disabled}`;
    }
    
    return baseClass;
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyPress = (e) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <button
      className={`${getButtonClass()} ${className}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      disabled={disabled}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
};

export default ButtonBig;
