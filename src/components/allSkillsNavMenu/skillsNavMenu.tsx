import { forwardRef, useMemo } from 'react';
import { SKILL_CATEGORY, getSkillValue } from '../../const/skillsCategoryMapping';
import styles from './skillsNavMenu.module.css';
import clsx from 'clsx';

interface SkillsNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const COLUMN_BREAK_POINT = 3;

export const SkillsNavMenu = forwardRef<HTMLDivElement, SkillsNavMenuProps>(
  ({ isOpen, onClose, className }, ref) => {
    if (!isOpen) return null;

    const renderCategory = useMemo(() => {
      return (category: { categoryName: string; subcategoryName: string[] }) => {
        const { color, icon } = getSkillValue(category.categoryName);

        return (
          <div
            className={styles.skillsCategory}
            key={category.categoryName}
            role='region'
            aria-labelledby={`category-${category.categoryName}`}
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
                  id={`category-${category.categoryName}`}
                  className={styles.categoryTitle}
                  role='heading'
                  aria-level={3}
                >
                  {category.categoryName}
                </h3>
                <div className={styles.subcategories} role='list'>
                  {category.subcategoryName.map((subcategory) => (
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
    }, [styles]);

    const firstColumn = SKILL_CATEGORY.slice(0, COLUMN_BREAK_POINT);
    const secondColumn = SKILL_CATEGORY.slice(COLUMN_BREAK_POINT);

    return (
      <div
        className={clsx(styles.skillsColumnContainer, className)}
        role='navigation'
        aria-label='Навигация по категориям навыков'
      >
        <div className={styles.skillsColumn}>
          {firstColumn.map((category) =>
            renderCategory(category)
          )}
        </div>
        <div className={styles.skillsColumn}>
          {secondColumn.map((category) =>
            renderCategory(category)
          )}
        </div>
      </div>
    );
  }
);
