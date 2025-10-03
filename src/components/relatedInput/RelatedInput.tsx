import React, { useState, useMemo } from 'react';
import styles from './RelatedInput.module.css';

// Определяем пропсы компонента
interface SearchableInputProps {
  items?: string[]; // Массив строк для поиска
  placeholder?: string;
}

export const RelatedInput: React.FC<SearchableInputProps> = ({
  items = [
    'Санкт-Петербург',
    'Самара',
    'Саратов',
    'Саранск',
    'Севастополь',
    'Москва',
    'Мурманск',
    'Магадан',
    'Новосибирск',
    'Нижний Новгород',
    'Норильск'
  ],
  placeholder = 'Не указан'
}) => {
  // Состояние для текста в поле ввода
  const [query, setQuery] = useState('');
  // Состояние для выбранного значения
  const [value, setValue] = useState('');

  // Фильтруем список только когда меняется запрос или исходный массив
  const filteredItems = useMemo(() => {
    if (!query) {
      return [];
    }
    return items.filter((item) =>
      item.toLowerCase().startsWith(query.toLowerCase())
    );
  }, [query, items]);

  // Обработчик изменения в поле ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setValue(''); // Сбрасываем выбранное значение, если пользователь начал печатать
  };

  // Обработчик клика по элементу в списке
  const handleItemClick = (item: string) => {
    setQuery(item);
    setValue(item);
  };

  // Обработчик клика по кнопке "очистить"
  const handleClearClick = () => {
    setQuery('');
    setValue('');
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          type='text'
          className={styles.searchInput}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        {query && (
          <button className={styles.clearButton} onClick={handleClearClick}>
            &times;
          </button>
        )}
      </div>

      {/* Показываем список, только если есть отфильтрованные элементы и не выбрано точное значение */}
      {filteredItems.length > 0 && !value && (
        <ul className={styles.suggestionsList}>
          {filteredItems.map((item, index) => (
            <li
              key={item[index]}
              className={styles.suggestionItem}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
