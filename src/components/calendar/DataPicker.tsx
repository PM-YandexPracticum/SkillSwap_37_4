import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  onDateChange: (date: Date | null) => void;
};

export const DatePickerComponent = ({ onDateChange }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
};

/*
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
