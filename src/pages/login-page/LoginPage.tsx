import { FC } from 'react';
import { LoginForm } from '../../components/loginForm/LoginForm';
import lightbulbIcon from '../../components/app/assets/static/iconsUi/light-bulb.svg';
import styles from './LoginPage.module.css';

export const LoginPage: FC = () => (
  <div className={styles.loginPage}>
    <h1 className={styles.title}>Вход</h1>
    <div className={styles.content}>
      <div className={styles.formSection}>
        <LoginForm buttonText='Войти' />
      </div>
      <div className={styles.onboardingSection}>
        <div className={styles.lightbulbContainer}>
          <img
            src={lightbulbIcon}
            alt='Лампочка'
            className={styles.lightbulbIcon}
          />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.welcomeTitle}>С возвращением в SkillSwap!</h2>
          <p className={styles.welcomeText}>
            Обменивайтесь знаниями и навыками с другими людьми
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
