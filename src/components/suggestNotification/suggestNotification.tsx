import React, { FC } from 'react';
import styles from './suggest-notification.module.css';
import { ReactComponent as LampIcon } from '../app/assets/static/icons/lamp.svg';
import { ReactComponent as CloseIcon } from '../app/assets/static/icons/cross.svg';
type suggestNotificationProps = {
  text: string;
  onClick: () => void;
  onAction: () => void;
};

export const SuggestNotificationUI: FC<suggestNotificationProps> = ({
  text,
  onClick,
  onAction
}) => {
  return (
    <>
      <div className={styles.card} onClick={onAction}>
        <div className={styles.left}>
          <LampIcon className={styles.icon} />
          <h3 className={styles.title}>{text}</h3>
        </div>

        {/* <button className={styles.action}
          onClick={onAction}
          aria-label='Перейти к предложению'
        > 
          Перейти
        </button> */}
        
        <button
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation(); 
            onClick();
          }}
          aria-label='Закрыть уведомление'
        >
          <CloseIcon />
        </button>
      </div>
    </>
  );
};
