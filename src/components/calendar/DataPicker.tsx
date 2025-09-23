import React, { useState, useRef } from 'react';
import { DropDown } from '../DropDown';
import { GreenButton } from '../buttons/GreenButton/GreenButton';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import styles from './DataPicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

type DatePickerProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
};

export const DatePickerComponent = ({
  selectedDate,
  setSelectedDate
}: DatePickerProps) => {
  const handleChange = (date: Date | null) => {
    if (date && date > new Date()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
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

  const currentYear = new Date().getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: new Date(0, i).toLocaleString('ru', { month: 'long' })
  }));

  const years = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Дата рождения</label>
      <DatePicker
        ref={ref}
        showIcon
        selected={selectedDate}
        onChange={handleChange}
        locale='ru'
        maxDate={new Date()}
        dateFormat='dd.MM.yyyy'
        shouldCloseOnSelect={false}
        calendarStartDay={1}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        className={styles.input}
        renderCustomHeader={({ date, changeYear, changeMonth }) => {
          const selectedMonth = months.find(
            (m) => m.value === date.getMonth().toString()
          );
          const selectedYear = years.find(
            (y) => y.value === date.getFullYear().toString()
          );

          return (
            <div className={styles['custom-header']}>
              <DropDown
                options={months}
                value={selectedMonth?.label}
                onChange={(option) => {
                  if (!Array.isArray(option)) {
                    changeMonth(Number(option.valueOf));
                  }
                }}
                placeholder='Месяц'
              />

              <DropDown
                options={years}
                value={selectedYear?.label}
                onChange={(option) => {
                  if (!Array.isArray(option)) {
                    changeYear(Number(option.valueOf));
                  }
                }}
                placeholder='Год'
              />
            </div>
          );
        }}
        calendarContainer={({ children }) => (
          <div className={styles['calendar-container']}>
            {children}
            <div className={styles.footer}>
              <GreenButton
                onClick={handleCancel}
                type='button'
                className='disabled'
              >
                Отменить
              </GreenButton>
              <GreenButton
                onClick={handleConfirm}
                type='button'
                className='active'
              >
                Выбрать
              </GreenButton>
            </div>
          </div>
        )}
      />
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
