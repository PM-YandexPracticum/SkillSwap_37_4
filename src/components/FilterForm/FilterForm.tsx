import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CITY_CATEGORY,
  SKILL_CATEGORY
} from '../../const/skillsCategoryMapping';
import { RadioGroup } from '../radio-group';
import { RadioItem } from '../radio-group/radio-group';
import { SkillsFilter, SkillsFilterState } from '../skillsFilter';
import styles from './FilterForm.module.css';

export type FilterObject = {
  category?: string[];
  subcategory?: string[];
  searchType?: 'wantLearn' | 'canLearn' | 'all';
  matchName?: string;
  sortByNew?: boolean;
  sortByLike?: boolean;
  city?: string;
  gender?: string;
  likedByCurrentUser?: boolean;
};

const buildFilterObject = (
  generalFilterId: string,
  genderFilterId: string,
  skillsState: SkillsFilterState,
  cityState: SkillsFilterState
): FilterObject => {
  const searchType: 'wantLearn' | 'canLearn' | 'all' =
    generalFilterId === 'wantToLearn'
      ? 'wantLearn'
      : generalFilterId === 'canTeach'
        ? 'canLearn'
        : 'all';

  const category: string[] = Object.keys(skillsState).filter(
    (key) => skillsState[key].selected
  );
  const subcategory: string[] = Object.values(skillsState).flatMap((cat) =>
    Object.keys(cat.subcategories).filter((sub) => cat.subcategories[sub])
  );

  const gender = genderFilterId === 'any' ? undefined : genderFilterId;

  const selectedCities: string[] = Object.keys(cityState).filter(
    (key) => cityState[key].selected
  );
  const city = selectedCities.length > 0 ? selectedCities[0] : undefined;

  return {
    searchType,
    category: category.length > 0 ? category : undefined,
    subcategory: subcategory.length > 0 ? subcategory : undefined,
    gender,
    city
  };
};

const updateURL = (
  navigate: ReturnType<typeof useNavigate>,
  filters: FilterObject
) => {
  const params = new URLSearchParams();
  if (filters.searchType) params.set('searchType', filters.searchType);
  if (filters.category) params.set('category', filters.category.join(','));
  if (filters.subcategory)
    params.set('subcategory', filters.subcategory.join(','));
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.city) params.set('city', filters.city);

  navigate(`?${params.toString()}`, { replace: true });
};

export const FilterForm = ({}) => {
  const navigate = useNavigate();
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
  const [skillsState, setSkillsState] = useState<SkillsFilterState>({});
  const [cityState, setCityState] = useState<SkillsFilterState>({});

  const updateGeneralFilter = (filterId: string) => {
    setFilter(
      filters.map((item) =>
        item.id === filterId
          ? { ...item, checked: true }
          : { ...item, checked: false }
      )
    );

    const selectedGender = genders.find((g) => g.checked) ?? genders[0];
    const fo = buildFilterObject(
      filterId,
      selectedGender.id,
      skillsState,
      cityState
    );
    updateURL(navigate, fo);
  };
  const updateGenderFilter = (genderId: string) => {
    setGender(
      genders.map((item) =>
        item.id === genderId
          ? { ...item, checked: true }
          : { ...item, checked: false }
      )
    );

    const selectedGeneral = filters.find((f) => f.checked) ?? filters[0];
    const fo = buildFilterObject(
      selectedGeneral.id,
      genderId,
      skillsState,
      cityState
    );
    updateURL(navigate, fo);
  };

  const handleSkillsChange = (state: SkillsFilterState) => {
    setSkillsState(state);
    const selectedGeneral = filters.find((f) => f.checked) ?? filters[0];
    const selectedGender = genders.find((g) => g.checked) ?? genders[0];
    const fo = buildFilterObject(
      selectedGeneral.id,
      selectedGender.id,
      state,
      cityState
    );
    updateURL(navigate, fo);
  };

  const handleCityChange = (state: SkillsFilterState) => {
    setCityState(state);
    const selectedGeneral = filters.find((f) => f.checked) ?? filters[0];
    const selectedGender = genders.find((g) => g.checked) ?? genders[0];
    const fo = buildFilterObject(
      selectedGeneral.id,
      selectedGender.id,
      skillsState,
      state
    );
    updateURL(navigate, fo);
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
          onChange={handleSkillsChange}
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
          onChange={handleCityChange}
        />
      </div>
    </div>
  );
};
