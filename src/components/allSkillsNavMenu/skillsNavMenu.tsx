import { forwardRef, useMemo } from 'react';
import { SKILL_CATEGORY, SKILL_VALUE } from '../../const/skillsCategoryMapping';
import styles from './skillsNavMenu.module.css';
import clsx from 'clsx';

interface SkillsNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const COLUMN_BREAK_POINT = 3;

// Создаем тип для категорий
type CategoryKey = keyof typeof SKILL_CATEGORY;

export const SkillsNavMenu = forwardRef<HTMLDivElement, SkillsNavMenuProps>(
  ({ isOpen, onClose, className }, ref) => {
    if (!isOpen) return null;

    const renderCategory = useMemo(() => {
      return (category: CategoryKey, subcategories: readonly string[]) => {
        const { color, icon } = SKILL_VALUE[category];

        return (
          <div
            className={styles.skillsCategory}
            key={category}
            role='region'
            aria-labelledby={`category-${category}`}
          >
            <div className={styles.skillsCategoryHeader}>
              <div
                className={styles.icon}
                style={{ backgroundColor: color }}
                aria-hidden='true'
              >
                <div
                  className={styles.iconMask}
                  style={{
                    maskImage: `url(${icon})`,
                    WebkitMaskImage: `url(${icon})`
                  }}
                />
              </div>
              <div className={styles.categoryContent}>
                <h3
                  id={`category-${category}`}
                  className={styles.categoryTitle}
                  role='heading'
                  aria-level={3}
                >
                  {category}
                </h3>
                <div className={styles.subcategories} role='list'>
                  {subcategories.map((subcategory) => (
                    <div
                      key={subcategory}
                      className={styles.subcategory}
                      onClick={onClose}
                      role='listitem'
                      tabIndex={0}
                      aria-label={`Перейти в категорию ${subcategory}`}
                    >
                      {subcategory}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      };
    }, [SKILL_VALUE, styles]);

    // Исправляем типизацию для Object.entries
    const categories = Object.entries(SKILL_CATEGORY) as [
      CategoryKey,
      readonly string[]
    ][];

    const firstColumn = categories.slice(0, COLUMN_BREAK_POINT);
    const secondColumn = categories.slice(COLUMN_BREAK_POINT);

    return (
      <div
        className={clsx(styles.skillsColumnContainer, className)}
        role='navigation'
        aria-label='Навигация по категориям навыков'
      >
        <div className={styles.skillsColumn}>
          {firstColumn.map(([category, subcategories]) =>
            renderCategory(category, subcategories)
          )}
        </div>
        <div className={styles.skillsColumn}>
          {secondColumn.map(([category, subcategories]) =>
            renderCategory(category, subcategories)
          )}
        </div>
      </div>
    );
  }
);
