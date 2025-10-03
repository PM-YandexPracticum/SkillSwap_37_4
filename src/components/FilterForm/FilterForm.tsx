import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  searchType?: 'wantLearn' | 'canTeach' | 'all';
  matchName?: string;
  sortByNew?: boolean;
  sortByLike?: boolean;
  city?: string;
  gender?: string;
  likedByUser?: boolean;
};

const fromApiSearchType = (
  v: string | null
): 'all' | 'wantToLearn' | 'canTeach' => {
  if (v === 'wantLearn') return 'wantToLearn';
  if (v === 'canTeach') return 'canTeach';
  return 'all';
};

const toApiSearchType = (id: string): 'all' | 'wantLearn' | 'canTeach' => {
  if (id === 'wantToLearn') return 'wantLearn';
  if (id === 'canTeach') return 'canTeach';
  return 'all';
};

const parseCSV = (s: string | null) =>
  s ? s.split(',').map((x) => x.trim()).filter(Boolean) : [];

const buildEmptySkillsState = (cats = SKILL_CATEGORY): SkillsFilterState => {
  const st: SkillsFilterState = {};
  cats.forEach((c) => {
    st[c.categoryName] = {
      selected: false,
      subcategories: Object.fromEntries(
        c.subcategoryName.map((sub) => [sub, false])
      ),
    };
  });
  return st;
};

const hydrateSkillsState = (
  base: SkillsFilterState,
  selectedCats: string[],
  selectedSubs: string[]
): SkillsFilterState => {
  const st: SkillsFilterState = JSON.parse(JSON.stringify(base));
  selectedCats.forEach((c) => {
    if (st[c]) st[c].selected = true;
  });
  selectedSubs.forEach((sub) => {
    Object.keys(st).forEach((cat) => {
      if (sub in st[cat].subcategories) st[cat].subcategories[sub] = true;
    });
  });
  return st;
};

const buildEmptyCityState = (cats = CITY_CATEGORY): SkillsFilterState => {
  const st: SkillsFilterState = {};
  cats.forEach((c) => {
    st[c.categoryName] = { selected: false, subcategories: {} };
  });
  return st;
};

const hydrateCityState = (
  base: SkillsFilterState,
  selectedCity?: string | null
): SkillsFilterState => {
  if (!selectedCity) return base;
  const st: SkillsFilterState = JSON.parse(JSON.stringify(base));
  if (st[selectedCity]) st[selectedCity].selected = true;
  return st;
};

const updateURL = (
  navigate: ReturnType<typeof useNavigate>,
  filters: FilterObject
) => {

  const params = new URLSearchParams(window.location.search);

  const setOrDelete = (key: string, value?: string | null) => {
    if (!value) params.delete(key);
    else params.set(key, value);
  };

  setOrDelete('searchType', filters.searchType || null);
  setOrDelete(
    'category',
    filters.category && filters.category.length ? filters.category.join(',') : null
  );
  setOrDelete(
    'subcategory',
    filters.subcategory && filters.subcategory.length
      ? filters.subcategory.join(',')
      : null
  );
  setOrDelete('gender', filters.gender || null);
  setOrDelete('city', filters.city || null);

  navigate(`?${params.toString()}`, { replace: true });
};

const buildFilterObject = (
  generalFilterId: string,
  genderFilterId: string,
  skillsState: SkillsFilterState,
  cityState: SkillsFilterState
): FilterObject => {
  const searchType: 'wantLearn' | 'canTeach' | 'all' =
    generalFilterId === 'wantToLearn'
      ? 'wantLearn'
      : generalFilterId === 'canTeach'
        ? 'canTeach'
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

export const FilterForm = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
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

   useEffect(() => {
    const p = new URLSearchParams(location.search);
    const searchTypeFromUrl = fromApiSearchType(p.get('searchType'));
    const catArr = parseCSV(p.get('category'));
    const subArr = parseCSV(p.get('subcategory'));
    const genderFromUrl = p.get('gender') ?? 'any';
    const cityFromUrl = p.get('city');

    setFilter((prev) =>
      prev.map((it) => ({ ...it, checked: it.id === searchTypeFromUrl }))
    );
    setGender((prev) =>
      prev.map((it) => ({ ...it, checked: it.id === genderFromUrl }))
    );

    setSkillsState(hydrateSkillsState(buildEmptySkillsState(), catArr, subArr));
    setCityState(hydrateCityState(buildEmptyCityState(), cityFromUrl));
  }, [location.search]);

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
