import React from 'react';
import styles from './SecondaryOutlineButton.module.css';

import type { ButtonProps } from '../GreenButton/GreenButton';

export const SecondaryOutlineButton: React.FC<ButtonProps> = ({
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

export default SecondaryOutlineButton;
