import { FC } from 'react';
import styles from './RegistrationPage2.module.css';
import userInfoIcon from '../../components/app/assets/static/images/userInfo.svg';

import { RegisterStepSecondForm } from '../../components/registerStepSecondForm/RegisterStepSecondForm';
import { OnboardingUI } from '../../components/ui/pages/onboarding';

export const RegistrationPageSecond = () => (
  <div className={styles.page}>
    <div className={styles.steps}>
      <p>Шаг 2 из 3</p>
      <div className={styles.steps__progress_bar}>
        <span className={styles.steps__line_active} />
        <span className={styles.steps__line_active} />
        <span className={styles.steps__line_disabled} />
      </div>
    </div>
    <div className={styles.content}>
      <RegisterStepSecondForm
        buttonNextText='Продолжить'
        buttonPrevText='Назад'
      />
      <OnboardingUI
        imageSrc={userInfoIcon}
        title='Расскажите немного о себе'
        description='Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
      />
    </div>
  </div>
);
