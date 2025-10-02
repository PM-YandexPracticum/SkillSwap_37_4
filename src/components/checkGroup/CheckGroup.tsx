import { FC } from 'react';
import { Checkbox } from '../ui/checkbox/Checkbox';
import style from './CheckGroup.module.css';

export type CheckGroupItem = {
  id: string;
  label: string;
};

type CheckGroupProps = {
  nameGroup: string;
  items: CheckGroupItem[];
  checkedItems: Record<string, boolean>;
  onChange: (id: string, checked: boolean) => void;
};

export const CheckGroup: FC<CheckGroupProps> = ({
  nameGroup,
  items,
  checkedItems,
  onChange
}) => (
  <div className={style.group}>
    <h3 className={style.title_group}>{nameGroup}</h3>
    {items.map((item) => (
      <Checkbox
        key={item.id}
        id={item.id}
        label={item.label}
        checked={!!checkedItems[item.id]}
        onChange={onChange}
      />
    ))}
  </div>
);
