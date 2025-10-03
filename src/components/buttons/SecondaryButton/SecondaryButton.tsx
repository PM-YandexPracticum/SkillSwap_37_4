import React from 'react';
import styles from './SecondaryButton.module.css';

import type { ButtonProps } from '../GreenButton/GreenButton';

export const SecondaryButton: React.FC<ButtonProps> = ({
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

export default SecondaryButton;
