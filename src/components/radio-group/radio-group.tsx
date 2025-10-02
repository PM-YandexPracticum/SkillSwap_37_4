import { FC } from 'react';
import styles from './radio-group.module.css';

export interface RadioItem {
  id: string;
  label: string;
  checked?: boolean;
}

export interface RadioGroupProps {
  items: RadioItem[];
  onChange: (id: string) => void;
  name: string;
  title?: string;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  items,
  onChange,
  name,
  title
}) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.radioGroup}>
      {title && <span className={styles.title}>{title}</span>}
      {items.map((item) => (
        <label key={item.id} className={styles.radioItem}>
          <input
            type='radio'
            name={name}
            checked={item.checked || false}
            onChange={handleRadioChange}
            value={item.id}
            className={styles.radioInput}
          />
          <span className={styles.radioLabel}>{item.label}</span>
        </label>
      ))}
    </div>
  );
};
