import { FC } from 'react';
import style from './Checkbox.module.css';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked);
  };

  return (
    <label className={style.label}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={style.input}
      />
      <span className={style.span}>{label}</span>
    </label>
  );
};