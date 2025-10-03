import React, { useState, useRef, useEffect } from 'react';
import styles from './DropDown.module.css';
import chevronDownIcon from '../app/assets/static/icons/chevron-down.svg';
import chevronUpIcon from '../app/assets/static/icons/chevron-up.svg';

export interface DropDownOption {
  value: string;
  label: string;
}

export interface DropDownProps {
  options: DropDownOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  options,
  value,
  placeholder = 'Выберите опцию',
  disabled = false,
  className = '',
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setFocusedIndex(-1);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleOptionClick(options[focusedIndex].value);
        } else {
          setIsOpen(!isOpen);
          setFocusedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        } else {
          setFocusedIndex(
            (prev) => (prev - 1 + options.length) % options.length
          );
        }
        break;
    }
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className}`}>
      <button
        ref={triggerRef}
        type='button'
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={styles.trigger}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label={selectedOption ? selectedOption.label : placeholder}
      >
        <span className={selectedOption ? styles.selected : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <img
          src={chevronDownIcon}
          alt=''
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={styles.options}
          role='listbox'
          aria-label='Опции выбора'
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              ref={(el) => {
                if (el) optionsRef.current[index] = el;
              }}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={handleKeyDown}
              className={`${styles.option} ${
                option.value === selectedValue ? styles.optionSelected : ''
              } ${index === focusedIndex ? styles.optionFocused : ''}`}
              role='option'
              aria-selected={option.value === selectedValue}
              tabIndex={-1}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
