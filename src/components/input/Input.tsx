import React, { CSSProperties, forwardRef } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPaddingRight?: string;
  onRightIconClick?: () => void;
  rightIconAriaLabel?: string;
  classNameInput?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      leftIcon,
      rightIcon,
      onRightIconClick,
      className,
      classNameInput,
      id,
      iconPaddingRight,
      rightIconAriaLabel,
      ...props
    },
    ref
  ) => (
    <div className={classNameInput}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.input__container}>
        {leftIcon}
        <input
          ref={ref}
          id={id}
          className={clsx(styles.input, className)}
          {...props}
        />
        {rightIcon && (
          <button
            type='button'
            aria-label={rightIconAriaLabel}
            className={clsx(styles.rightIcon, styles.icon)}
            onClick={onRightIconClick}
            style={{right: iconPaddingRight}}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
);

Input.displayName = 'Input';
