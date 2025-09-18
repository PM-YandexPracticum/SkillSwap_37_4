import React, { useId, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchField.module.css';
import { Input } from '../input/Input';

interface SearchFieldProps {
  placeholder?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = 'Искать навык'
}) => {
  const [value, setValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId(); // уникальный id для каждого поля

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue('');

  return (
    <Input
      ref={searchInputRef}
      type='text'
      value={value}
      id={`search__input-${generatedId}`}
      onChange={handleChange}
      iconPaddingRight='32px'
      placeholder={placeholder}
      className={styles.search_input}
      rightIconAriaLabel='Очистить поле поиска'
      leftIcon={<Search className={styles.leftIcon} />}
      onRightIconClick={clearInput}
      rightIcon={value && <X className={styles.searchInputRightIcon} />}
    />
  );
};
