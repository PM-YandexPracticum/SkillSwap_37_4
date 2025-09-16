import React from 'react';
import { SkillsButtonProps } from './types';
import styles from './SkillsButton.module.css';
import ChevronDownIcon from '../../assets/icons/chevron-down.svg';

export const SkillsButton: React.FC<SkillsButtonProps> = ({
  color = '#000000',
  onClick,
  className = '',
  text = 'Все навыки',
  iconSize = 24,
  isOpen = false
}) => {
  return (
    <button
      className={`${styles.skillsButton} ${className}`}
      onClick={onClick}
      style={{ color }}
      type="button"
      aria-label={text}
    >
      <span className={styles.skillsButton__text}>
        {text}
      </span>
      <ChevronDownIcon
        width={iconSize}
        height={iconSize}
        className={`${styles.skillsButton__arrow} ${isOpen ? styles['skillsButton__arrow--rotated'] : ''}`}
        style={{ color }}
      />
    </button>
  );
};

export default SkillsButton;
