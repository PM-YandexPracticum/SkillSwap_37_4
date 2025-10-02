import React, { RefObject, useId, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordField.module.css';
import { Input } from '../input/Input';

interface PasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement>;
  id?: string;
  placeholder?: string;
  label?: string;
  subLabel?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder = 'Введите ваш пароль',
  label = 'Пароль',
  value,
  onChange,
  id,
  inputRef,
  subLabel
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      label={label}
      ref={inputRef}
      type={showPassword ? 'text' : 'password'}
      value={value}
      fields__container={styles.fields__container}
      id={id}
      subLabel={subLabel}
      onChange={handleChange}
      iconPaddingRight='20px'
      placeholder={placeholder}
      className={styles.password__input}
      rightIconAriaLabel='Скрыть/Показать пароль'
      onRightIconClick={toggleShowPassword}
      rightIcon={value && showPassword ? <EyeOff /> : <Eye />}
    />
  );
};
