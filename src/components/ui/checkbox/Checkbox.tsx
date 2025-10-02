import { FC } from 'react';
import style from './Checkbox.module.css';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
  variant?: 'check' | 'minus';
};

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  variant = 'check'
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked);
  };

  return (
    <label className={style.label}>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className={`${style.input} ${variant === 'minus' ? style.iconMinus : style.iconCheck}`}
      />
      <span className={style.span}>{label}</span>
    </label>
  );
};
