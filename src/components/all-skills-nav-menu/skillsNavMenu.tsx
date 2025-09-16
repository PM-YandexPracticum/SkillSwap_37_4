import { forwardRef } from 'react';
import { SKILL_CATEGORY, SKILL_VALUE } from '../shared/lib/skillsCategoryMapping';
import styles from './skillsNavMenu.module.css';

interface SkillsNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsNavMenu = forwardRef<HTMLDivElement, SkillsNavMenuProps>(({ isOpen }, ref) => {

  if (!isOpen) return null;

  const renderCategory = (
    skillsCategory: string,
    subcategories: string[],
    iconPath: string,
    bgColor: string,
  ) => (
    <div className={styles.skillsCategory} key={skillsCategory}>
      <div className={styles.skillscategoryHeader}>
        <div className={styles.icon} style={{ backgroundColor: bgColor }}>
          <div
            className={styles.iconMask}
            style={{
              maskImage: `url(${iconPath})`,
              WebkitMaskImage: `url(${iconPath})`,
            }}
          />
        </div>
        <div className={styles.categoryContent}>
          <h3 className={styles.categoryTitle}>{skillsCategory}</h3>
          <div className={styles.subcategories}>
            {subcategories.map(sub => (
              <div key={sub} className={styles.subcategory}>
                {sub}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const categories = Object.entries(SKILL_CATEGORY).map(([category, subcategories]) => {
    return [category, subcategories];
  });

  const firstColumnCategories = [categories[0], categories[2], categories[4]];
  const secondColumnCategories = [categories[1], categories[3], categories[5]];

  return (
    <>
    <div className={styles.skillsColumn}>
        {firstColumnCategories.map(([skillsCategory, subcategories]) => {
        const { color, icon } = SKILL_VALUE[skillsCategory as keyof typeof SKILL_VALUE];
        return renderCategory(skillsCategory, subcategories, icon, color);
        })}
    </div>
    <div className={styles.skillsColumn}>
        {secondColumnCategories.map(([skillsCategory, subcategories]) => {
        const { color, icon } = SKILL_VALUE[skillsCategory as keyof typeof SKILL_VALUE];
        return renderCategory(skillsCategory, subcategories, icon, color);
        })}
    </div>
    </>

  );
});

