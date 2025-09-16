import React from 'react';
import styles from './TransparentButton.module.css';

import type { ButtonProps } from '../GreenButton/GreenButton';

export const TransparentButton: React.FC<ButtonProps> = ({
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

export default TransparentButton;
