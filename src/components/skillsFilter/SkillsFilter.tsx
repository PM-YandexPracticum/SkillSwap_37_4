import { FC, useState } from 'react';
import { Checkbox } from '../ui/checkbox/Checkbox';
import { ExpandButton } from '../buttons/ExpandButton/ExpandButton';
import styles from './SkillsFilter.module.css';
import { SkillCategory } from '../../const/skillsCategoryMapping';

// интерфейс перенесён в const/skillsCategoryMapping.ts

export interface SkillsFilterState {
  [categoryName: string]: {
    selected: boolean;
    subcategories: { [subcategoryName: string]: boolean };
  };
}

interface SkillsFilterProps {
  categories: SkillCategory[];
  title: string;
  onChange: (state: SkillsFilterState) => void;
}

export const SkillsFilter: FC<SkillsFilterProps> = ({
  categories,
  title,
  onChange
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [state, setState] = useState<SkillsFilterState>(() => {
    const initialState: SkillsFilterState = {};
    categories.forEach((category) => {
      initialState[category.categoryName] = {
        selected: false,
        subcategories: {}
      };
      category.subcategoryName.forEach((sub) => {
        initialState[category.categoryName].subcategories[sub] = false;
      });
    });
    return initialState;
  });

  const toggleExpanded = (categoryName: string) => {
    if (expanded.includes(categoryName)) {
      setExpanded(expanded.filter((name) => name !== categoryName));
    } else {
      setExpanded([...expanded, categoryName]);
    }
  };

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const newState = { ...state };
    newState[categoryName].selected = checked;

    Object.keys(newState[categoryName].subcategories).forEach((sub) => {
      newState[categoryName].subcategories[sub] = checked;
    });

    setState(newState);
    onChange(newState);
  };

  const handleSubcategoryChange = (
    categoryName: string,
    subcategoryName: string,
    checked: boolean
  ) => {
    const newState = { ...state };
    newState[categoryName].subcategories[subcategoryName] = checked;

    const subcategories = Object.values(newState[categoryName].subcategories);
    newState[categoryName].selected = subcategories.every(Boolean);

    setState(newState);
    onChange(newState);
  };

  const getCategoryVariant = (categoryName: string) => {
    const subcategories = Object.values(state[categoryName].subcategories);
    const someSelected = subcategories.some(Boolean);
    const allSelected = subcategories.every(Boolean);

    if (someSelected && !allSelected) return 'minus';
    return 'check';
  };

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  return (
    <div className={styles.skillsFilter}>
      <h2 className={styles.title}>{title}</h2>

      {visibleCategories.map((category) => (
        <div key={category.categoryName} className={styles.category}>
          <div className={styles.categoryHeader}>
            <Checkbox
              id={category.categoryName}
              label={category.categoryName}
              checked={state[category.categoryName].selected}
              onChange={(_, checked) =>
                handleCategoryChange(category.categoryName, checked)
              }
              variant={getCategoryVariant(category.categoryName)}
            />
            {category.subcategoryName.length > 0 && (
              <ExpandButton
                onClick={() => toggleExpanded(category.categoryName)}
                isOpen={expanded.includes(category.categoryName)}
                color='#508826'
                iconSize={20}
              />
            )}
          </div>

          {expanded.includes(category.categoryName) && (
            <div className={styles.subcategories}>
              {category.subcategoryName.map((subcategory) => (
                <Checkbox
                  key={subcategory}
                  id={`${category.categoryName}-${subcategory}`}
                  label={subcategory}
                  checked={
                    state[category.categoryName].subcategories[subcategory]
                  }
                  onChange={(_, checked) =>
                    handleSubcategoryChange(
                      category.categoryName,
                      subcategory,
                      checked
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {categories.length > 6 && (
        <ExpandButton
          text={
            showAllCategories
              ? 'Скрыть'
              : title === 'Город'
                ? 'Все города'
                : 'Все категории'
          }
          color='#508826'
          className={styles.allCategoriesButton}
          onClick={() => setShowAllCategories(!showAllCategories)}
          isOpen={showAllCategories}
        />
      )}
    </div>
  );
};
