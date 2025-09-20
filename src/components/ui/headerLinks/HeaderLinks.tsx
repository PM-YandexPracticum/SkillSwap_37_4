import { Link } from 'react-router-dom';
import styles from './HeaderLinks.module.css';
import { useState } from 'react';
import ExpandButton from '../../buttons/ExpandButton';
import { SkillsNavMenu } from '../../allSkillsNavMenu/skillsNavMenu';
import { AppLink } from '../appLink/appLink';

export const HeaderLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.section}>
      <ul className={`${styles.linksList}`}>
        <li>
          <AppLink to={'/about'} text={'О проекте'}/>
        </li>
        <li>
          <ExpandButton
            text="Все навыки"
            isOpen={isOpen}
            onClick={handleToggle}
            color='black'
            className={styles.expand_button}
          />
        <SkillsNavMenu isOpen={isOpen} onClose={() => {handleToggle}} className={styles.skillsNavMenu} />
        </li>
      </ul>
    </div>
  );
};
