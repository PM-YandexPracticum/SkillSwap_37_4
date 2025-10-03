import { FC } from 'react';
import styles from './onboarding.module.css';
import clsx from 'clsx';

export type OnboardingProps = {
  imageSrc: string;
  title: string;
  description: string;
  classContainer?: string;
};

export const OnboardingUI: FC<OnboardingProps> = ({
  imageSrc,
  title,
  description,
  classContainer
}) => (
  <div className={clsx(styles.container, classContainer)}>
    <img src={imageSrc} className={styles.icon} alt='light bulb' />
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);
