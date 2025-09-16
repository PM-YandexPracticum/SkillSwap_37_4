import { useState } from "react";

type CategoryCheckboxProps = {
  categoryName: string;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<CategoryCheckboxProps> = ({ categoryName, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked); // отдаём наружу инфу о клике
  };

  return <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="w-5 h-5"
    />
    <span>{categoryName}</span>
  </label>
};