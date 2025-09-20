import styles from './FooterLinks.module.css';
import { AppLink } from '../appLink/appLink';

export const FooterLinks = () => (
  <nav className={styles.nav_menu}>
    <ul className={`${styles.linksList}`}>
      <li>
        <AppLink to={'/about'} text={'О проекте'}/>
      </li>
      <li>
        <AppLink to={'/all_skills'} text={'Все навыки'}/>
      </li>
    </ul>

    <ul className={styles.linksList}>
      <li>
        <AppLink to={'/contacts'} text={'Контакты'}/>
      </li>
      <li>
        <AppLink to={'/blog'} text={'Блог'}/>
      </li>
    </ul>

    <ul className={styles.linksList}>
      <li>
        <AppLink to={'/privacy'} text={'Политика конфиденциальности'}/>
      </li>
      <li>
        <AppLink to={'/terms'} text={'Пользовательское соглашение'}/>
      </li>
    </ul>
  </nav>
);
