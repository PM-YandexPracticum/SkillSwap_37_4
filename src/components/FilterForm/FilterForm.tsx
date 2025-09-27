import { useState } from 'react';
import {
  CITY_CATEGORY,
  SKILL_CATEGORY
} from '../../const/skillsCategoryMapping';
import { RadioGroup } from '../radio-group';
import { RadioItem } from '../radio-group/radio-group';
import { SkillsFilter, SkillsFilterState } from '../skillsFilter';
import styles from './FilterForm.module.css';

const handleGeneralFilterChange = (state: SkillsFilterState) => {
  // Здесь будет логика обработки выбора
};

export const FilterForm = ({}) => {
  const generalFilterItems: RadioItem[] = [
    { id: 'all', label: 'Всё', checked: true },
    { id: 'wantToLearn', label: 'Хочу научиться' },
    { id: 'canTeach', label: 'Могу научить' }
  ];

  const genderFilterItems: RadioItem[] = [
    { id: 'any', label: 'Не имеет значения', checked: true },
    { id: 'male', label: 'Мужской' },
    { id: 'female', label: 'Женский' }
  ];

  const [filters, setFilter] = useState(generalFilterItems);
  const [genders, setGender] = useState(genderFilterItems);

  const updateGeneralFilter = (filterId: string) => {
    setFilter(
      filters.map((item) =>
        item.id === filterId
          ? { ...item, checked: true }
          : { ...item, checked: false }
      )
    );
  };
  const updateGenderFilter = (genderId: string) => {
    setGender(
      genders.map((item) =>
        item.id === genderId
          ? { ...item, checked: true }
          : { ...item, checked: false }
      )
    );
  };

  return (
    <div className={styles.filters__container}>
      <h1>Фильтры</h1>
      <div className={styles.filters}>
        <RadioGroup
          name='generalFilterItems'
          items={filters}
          onChange={updateGeneralFilter}
        />
        <SkillsFilter
          categories={SKILL_CATEGORY}
          title='Навыки'
          onChange={handleGeneralFilterChange}
        />
        <RadioGroup
          name='genderFilterItems'
          items={genders}
          onChange={updateGenderFilter}
          title='Пол автора'
        />
        <SkillsFilter
          categories={CITY_CATEGORY}
          title='Город'
          onChange={handleGeneralFilterChange}
        />
      </div>
    </div>
  );
};
