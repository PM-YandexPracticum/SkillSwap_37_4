import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchField.module.css';

interface SearchFieldProps {
  placeholder?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = 'Искать навык'
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearInput = () => {
    setValue('');
  };

  return (
    <div className={styles.input__container}>
      <Search style={{ color: '#69735D' }} />
      <input
        className={styles.input}
        id='searchInput'
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {value && (
        <button className={styles.clearButton} onClick={clearInput}>
          <X style={{ color: '#253017' }} />
        </button>
      )}
    </div>
  );
};
