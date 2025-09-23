import { FC } from 'react';
import styles from './RegistrationPage.module.css';
import lightBulbIcon from '../../components/app/assets/static/icons/light-bulb.svg';

import { LoginForm } from '../../components/loginForm/LoginForm';
import { OnboardingUI } from '../../components/ui/pages/onboarding';

export const RegistrationPage = () => (
  <div className={styles.page}>
    <LoginForm buttonText='Далее' />
    <OnboardingUI
      imageSrc={lightBulbIcon}
      title='Расскажите немного о себе'
      description='Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
    />
  </div>
);
