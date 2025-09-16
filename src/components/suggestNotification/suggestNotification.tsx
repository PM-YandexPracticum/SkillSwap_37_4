import React, { FC } from 'react';
import styles from './suggest-notification.module.css';
import { ReactComponent as LampIcon } from './lamp.svg';
import { ReactComponent as CloseIcon } from './cross.svg';
type suggestNotificationProps = {
  senderName: string;
  onClick: () => void;
  onAction: () => void;
};

export const SuggestNotificationUI: FC<suggestNotificationProps> = ({
  senderName,
  onClick,
  onAction
}) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <LampIcon className={styles.icon} />
          <h3 className={styles.title}>{senderName} предлагает вам обмен</h3>
        </div>
        <button
          className={styles.action}
          onClick={onAction}
          aria-label='Перейти к предложению'
        >
          Перейти
        </button>

        {/* Крестик поверх всего */}
        <button
          className={styles.close}
          onClick={onClick}
          aria-label='Закрыть уведомление'
        >
          <CloseIcon />
        </button>
      </div>
    </>
  );
};
