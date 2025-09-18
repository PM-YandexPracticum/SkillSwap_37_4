import React, { useId, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordField.module.css';
import { Input } from '../input/Input';

interface PasswordFieldProps {
  placeholder?: string;
  label?: string;
  subLabel?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder = 'Введите ваш пароль',
  label = 'Пароль',
  subLabel = 'Пароль должен содержать не менее 8 знаков'
}) => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      label={label}
      ref={passwordInputRef}
      type={showPassword ? 'text' : 'password'}
      value={value}
      id={`password-${generatedId}`}
      subLabel={subLabel}
      onChange={handleChange}
      iconPaddingRight='32px'
      placeholder={placeholder}
      className={styles.password__input}
      rightIconAriaLabel='Скрыть/Показать пароль'
      onRightIconClick={toggleShowPassword}
      rightIcon={value && showPassword ? <EyeOff /> : <Eye />}
    />
  );
};
