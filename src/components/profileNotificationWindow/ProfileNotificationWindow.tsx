import React, { FC, useMemo, useState } from 'react';
import styles from './ProfileNotificationWindow.module.css';
import { NotificationItem } from '../notificationItem';

export type NotificationData = {
  notifyId: string;
  title: string;
  description: string;
  date: Date;
  viewed: boolean;
};

type Props = {
  initial: NotificationData[];
};

export const ProfileNotificationWindow: FC<Props> = ({ initial }) => {
  const [items, setItems] = useState(initial);

  const { newItems, viewedItems } = useMemo(() => ({
    newItems: items.filter(n => !n.viewed),
    viewedItems: items.filter(n => n.viewed),
  }), [items]);

  const markAllAsRead = () =>
    setItems(prev => prev.map(n => ({ ...n, viewed: true })));

  const clearViewed = () =>
    setItems(prev => prev.filter(n => !n.viewed));

  const handleGo = (id: string) => {
    console.log('go /profile for', id);
    setItems(prev => prev.map(n => n.notifyId === id ? { ...n, viewed: true } : n));
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Новые уведомления</h2>
        {newItems.length > 0 && (
          <button onClick={markAllAsRead} className={styles.linkBtn}>
            Прочитать все
          </button>
        )}
      </header>

      <div className={styles.list}>
        {newItems.map(n => (
          <NotificationItem
            key={n.notifyId}
            title={n.title}
            description={n.description}
            date={n.date}
            onClick={() => handleGo(n.notifyId)}
          />
        ))}
        {newItems.length === 0 && (
          <p className={styles.empty}>Новых уведомлений нет</p>
        )}
      </div>

      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Просмотренные</h2>
        {viewedItems.length > 0 && (
          <button onClick={clearViewed} className={styles.linkBtn}>
            Очистить
          </button>
        )}
      </header>

      <div className={styles.list}>
        {viewedItems.map(n => (
          <NotificationItem
            key={n.notifyId}
            title={n.title}
            description={n.description}
            date={n.date}
          />
        ))}
        {viewedItems.length === 0 && (
          <p className={styles.empty}>Пока ничего не просмотрено</p>
        )}
      </div>
    </section>
  );
};

