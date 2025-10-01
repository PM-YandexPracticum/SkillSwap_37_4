import React, { useState, useRef, useMemo } from 'react';
import { DropDown } from '../DropDown';
import { GreenButton } from '../buttons/GreenButton/GreenButton';
import GreenBorderButton from '../buttons/GreenBorderButton';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DataPicker.module.css';

registerLocale('ru', ru);

// Общий интерфейс для опций выбора
interface SelectOption {
  value: string;
  label: string;
}

// Интерфейс для месяцев
interface MonthOption extends SelectOption {
  value: string;
  label: string;
}

// Интерфейс для годов
interface YearOption extends SelectOption {
  value: string;
  label: string;
}

// Утилита для получения локализованных месяцев
const getLocalizedMonths = (locale: any): MonthOption[] =>
  Array.from({ length: 12 }, (_, monthIndex) => ({
    value: monthIndex.toString(),
    label: format(new Date(2023, monthIndex), 'LLLL', { locale })
  }));

// Хук для получения месяцев
const useLocalizedMonths = (locale: any = ru): MonthOption[] =>
  useMemo(() => getLocalizedMonths(locale), [locale]);

// Утилита для получения списка годов *format(new Date(year), 'yyyy', { locale: ru })
const getYears = (startYear: number, count: number): YearOption[] =>
  Array.from({ length: count }, (_, index) => {
    const year = startYear - index;
    return {
      value: year.toString(),
      label: year.toString()
    };
  });

// Хук для получения годов
const useYears = (): YearOption[] => {
  const currentYear = new Date().getFullYear();
  return useMemo(() => getYears(currentYear, 100), [currentYear]);
};

interface DatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export const DatePickerComponent: React.FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate
}) => {
  const datePickerRef = useRef<any>(null);
  const months = useLocalizedMonths(ru);
  const years = useYears();
  // console.log(months, years);
  const handleDateChange = (date: Date | null) => {
    if (date && date > new Date()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handleCancel = () => {
    setSelectedDate(null);
    datePickerRef.current?.setOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(selectedDate);
    datePickerRef.current?.setOpen(false);
  };

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth
  }: {
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
  }) => {
    const selectedMonth = months.find(
      (m) => m.value === date.getMonth().toString()
    );
    const selectedYear = years.find(
      (y) => y.value === date.getFullYear().toString()
    );
    //console.log(selectedMonth);
    return (
      <div className={styles.custom__header}>
        <DropDown
          options={months}
          //value={selectedMonth?.label}
          onChange={(option) => {
            if (typeof option === 'string') {
              changeMonth(Number(option));
            }
          }}
          placeholder='Месяц'
        />

        <DropDown
          options={years}
          value={selectedYear?.label}
          onChange={(option) => {
            if (typeof option === 'string') {
              changeYear(Number(option));
            }
          }}
          placeholder='Год'
        />
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Дата рождения</label>
      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={handleDateChange}
        locale='ru'
        maxDate={new Date()}
        dateFormat='dd.MM.yyyy'
        shouldCloseOnSelect={false}
        calendarStartDay={1}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        className={styles.input}
        renderCustomHeader={renderCustomHeader}
        calendarContainer={({ children }) => (
          <div className={styles['calendar-container']}>
            {children}
            <div className={styles.footer}>
              <GreenBorderButton
                onClick={handleCancel}
                type='button'
                /*className='disabled'*/
              >
                Отменить
              </GreenBorderButton>
              <GreenButton
                onClick={handleConfirm}
                /*className={styles.confirm_button}*/
                type='submit'
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

export default DatePickerComponent;
