import styles from './errorPage.module.css';
import { notFoundProps } from './type';
import React, { FC } from 'react';

export const ErrorPageUI: FC<notFoundProps> = ({
  imageSrc,
  title,
  message,
  children
}) => (
  <div className={styles.container}>
    <div>
      <img src={imageSrc} alt='Ошибка страницы' />
    </div>
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
      {children && <div className={styles.buttonsContainer}>{children}</div>}
    </div>
  </div>
);
