import React from 'react';
import { ExpandButtonProps } from './types';
import styles from './ExpandButton.module.css';
import { ReactComponent as ChevronDownIcon } from '../../app/assets/static/icons/chevron-down.svg';

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  color = '#000000',
  onClick,
  className = '',
  text = 'Все навыки',
  iconSize = 24,
  isOpen = false
}) => (
  <button
    className={`${styles.expandButton} ${className}`}
    onClick={onClick}
    style={{ color }}
    type='button'
    aria-label={text}
  >
    <span className={styles.expandButton__text}>{text}</span>
    <ChevronDownIcon
      width={iconSize}
      height={iconSize}
      className={`${styles.expandButton__arrow} ${isOpen ? styles['expandButton__arrow--rotated'] : ''}`}
      style={{ color }}
    />
  </button>
);

export default ExpandButton;
