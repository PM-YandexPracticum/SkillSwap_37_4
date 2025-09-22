import React, { useState, useRef } from 'react';
import { Dropdown } from '../DropDown';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import styles from './DataPicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

type DatePickerProps = {
  onDateChange: (date: Date | null) => void;
};

export const DatePickerComponent = ({ onDateChange }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const ref = useRef<any>(null);

  const handleCancel = () => {
    setSelectedDate(null);
    ref.current?.setOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(selectedDate);
    ref.current?.setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Дата рождения</label>
      <DatePicker showIcon selected={selectedDate} onChange={handleChange} />
    </div>
  );
};

/*
  return (
    <div>
      <DatePicker showIcon selected={selectedDate} onChange={handleChange} />
    </div>
  );

const App = () => {
  const handleDateChange = (date: Date | null) => {
    console.log('Выбранная дата:', date);
  };

  return (
    <div>
      <h1>Тестовый виджет</h1>
      <DatePickerComponent onDateChange={handleDateChange} />
    </div>
  );
}; 
*/
