import { Link } from 'react-router-dom';
import styles from './FooterLinks.module.css';

export const FooterLinks = () => {
  return (
    <>
      <div className={styles.section}>
        <ul className={`${styles.linksList}`}>
          <li>
            <Link to='/about'>О проекте</Link>
          </li>
          <li>
            <Link to='/all_skills'>Все навыки</Link>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <ul className={styles.linksList}>
          <li>
            <Link to='/contacts'>Контакты</Link>
          </li>
          <li>
            <Link to='/blog'>Блог</Link>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <ul className={styles.linksList}>
          <li>
            <Link to='/privacy'>Политика конфиденциальности</Link>
          </li>
          <li>
            <Link to='/terms'>Пользовательское соглашение</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
