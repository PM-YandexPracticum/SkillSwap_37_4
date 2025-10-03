import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
  error?: string;
  success?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPaddingRight?: string;
  fields__container?: string;
  onRightIconClick?: () => void;
  rightIconAriaLabel?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      leftIcon,
      rightIcon,
      subLabel,
      onRightIconClick,
      className,
      id,
      onChange,
      iconPaddingRight,
      rightIconAriaLabel,
      fields__container,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <div className={clsx(styles.field__container, fields__container)}>
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
            onChange={handleChange}
            {...props}
          />
          {rightIcon && (
            <button
              type='button'
              aria-label={rightIconAriaLabel}
              className={clsx(styles.rightIcon, styles.icon)}
              onClick={onRightIconClick}
              style={{ right: iconPaddingRight }}
            >
              {rightIcon}
            </button>
          )}
        </div>
        {subLabel && <span className={styles.subLabel}>{subLabel}</span>}
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
