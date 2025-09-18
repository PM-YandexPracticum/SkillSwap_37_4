import { FC } from 'react';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import notificationLightIcon from '../../components/app/assets/static/icons/notification-light.svg';
import GreenButton from '../buttons/GreenButton';
import styles from './NotificationItem.module.css';

export type NotificationProps = {
  title: string;
  description: string;
  date: Date | string | number;
  onClick?: () => void;
};

const formatDate = (date: Date | string | number): string => {
  const dateValue = date instanceof Date ? date : new Date(date);
  const now = new Date();

  const minutes = differenceInMinutes(now, dateValue);
  const hours = differenceInHours(now, dateValue);
  const days = differenceInDays(now, dateValue);

  if (minutes < 1) return 'сейчас';
  if (minutes < 60) return `${minutes} мин. назад`;
  if (days === 0) return `${hours} ч. назад`;
  if (days === 1) return 'вчера';

  return dateValue.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long'
  });
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
      <span className={styles.date}>{formatDate(date)}</span>
    </div>
    {onClick && (
      <GreenButton className={styles.button} onClick={onClick}>
        Готово
      </GreenButton>
    )}
  </div>
);
