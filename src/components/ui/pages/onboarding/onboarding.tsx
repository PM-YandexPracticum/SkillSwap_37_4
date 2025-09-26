import { FC } from 'react';
import styles from './onboarding.module.css';

export type OnboardingProps = {
  imageSrc: string;
  title: string;
  description: string;
};

export const OnboardingUI: FC<OnboardingProps> = ({
  imageSrc,
  title,
  description
}) => (
  <div className={styles.container}>
    <img src={imageSrc} className={styles.icon} alt='light bulb' />
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);
