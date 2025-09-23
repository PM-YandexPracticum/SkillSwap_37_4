import React, { useState, useRef, useMemo } from 'react';
import { DropDown } from '../DropDown';
import { GreenButton } from '../buttons/GreenButton/GreenButton';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import styles from './DataPicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';

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
const getLocalizedMonths = (locale: any): MonthOption[] => {
  return Array.from({ length: 12 }, (_, monthIndex) => ({
    value: monthIndex.toString(),
    label: format(new Date(2023, monthIndex), 'LLLL', { locale }),
  }));
};

// Хук для получения месяцев
const useLocalizedMonths = (locale: any = ru): MonthOption[] => {
  return useMemo(() => getLocalizedMonths(locale), [locale]);
};

// Утилита для получения списка годов
const getYears = (startYear: number, count: number): YearOption[] => {
  return Array.from({ length: count }, (_, index) => {
    const year = startYear - index;
    return {
      value: year.toString(),
      label: format(new Date(year), 'yyyy', { locale: ru }),
    };
  });
};

// Хук для получения годов
const useYears = (): YearOption[] => {
  const currentYear = new Date().getFullYear();
  return useMemo(() => getYears(currentYear, 100), [currentYear]);
};

interface DatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const datePickerRef = useRef<any>(null);
  const months = useLocalizedMonths(ru);
  const years = useYears();

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

  const renderCustomHeader = ({ date, changeYear, changeMonth }) => {
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
        showIcon
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

export default DatePickerComponent;
