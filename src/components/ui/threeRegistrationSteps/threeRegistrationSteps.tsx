import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './threeRegistrationSteps.module.css';
import clsx from 'clsx';

const TOTAL_STEPS = 3;

export const ThreeRegistrationSteps = () => {
  const { stepNumber } = useParams();
  const currentStep = Math.min(
    Math.max(parseInt(stepNumber ?? '1', 10), 1),
    TOTAL_STEPS
  );

  return (
    <div className={clsx(styles.stepContainer)}>
      <div className={styles.stepText}>
        Шаг {currentStep} из {TOTAL_STEPS}
      </div>
      <div className={styles.progressBar}>
        {[...Array(TOTAL_STEPS)].map((_, index) => (
          <div
            key={index}
            className={`${styles.progressSegment} ${index < currentStep ? styles.progressSegmentActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
