import React from 'react';
import styles from './GreenBorderButton.module.css';

import type { ButtonProps } from '../GreenButton/GreenButton';

export const GreenBorderButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${styles.button} ${className}`}
  >
    {children}
  </button>
);

export default GreenBorderButton;
