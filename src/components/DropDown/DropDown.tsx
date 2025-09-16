import React, { useState } from 'react';

interface DropDownOption {
  value: string;
  label: string;
}

interface DropDownProps {
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
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  const triggerCursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  const triggerStyle = { cursor: disabled ? 'not-allowed' as const : 'pointer' as const };
  const optionStyle = { cursor: 'pointer' as const, userSelect: 'none' as const };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`w-full p-3 bg-white border rounded ${triggerCursor}`}
        style={triggerStyle}
      >
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="float-right">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-white border rounded mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="p-3"
              style={optionStyle}
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
