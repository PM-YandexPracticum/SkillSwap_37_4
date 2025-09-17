import { FC } from 'react';
import notificationLightIcon from '../../components/app/assets/static/icons/notification-light.svg';
import GreenButton from '../buttons/GreenButton';
import styles from './NotificationItem.module.css';

export type NotificationProps = {
  title: string;
  description: string;
  date: string;
  onClick?: () => void;
};

export const NotificationItem: FC<NotificationProps> = ({
  title,
  description,
  date,
  onClick
}) => (
  <div className={styles.content}>
    <div className={styles.message}>
      <img
        src={notificationLightIcon}
        alt='notification light icon'
        className={styles.icon}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.date}>{date}</span>
    </div>
    {onClick && (
      <GreenButton className={styles.button} onClick={onClick}>
        Готово
      </GreenButton>
    )}
  </div>
);
