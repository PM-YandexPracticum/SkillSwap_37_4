import { FC } from 'react';
import styles from './RegistrationPage2.module.css';
import userInfoIcon from '../../components/app/assets/static/images/user-info.svg';

import { RegisterStepSecondForm } from '../../components/registerStepSecondForm/RegisterStepSecondForm';
import { OnboardingUI } from '../../components/ui/pages/onboarding';

export const RegistrationPage = () => (
  <div className={styles.page}>
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
);
