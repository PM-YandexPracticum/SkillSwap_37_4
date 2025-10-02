import { FC } from 'react';
import { Modal, TModalProps } from '../../../components/modal';
import notificationIcon from '../../../components/app/assets/static/icons/notification.svg';
import styles from './ExchangeProposedModal.module.css';
import GreenButton from '../../buttons/GreenButton';

export const ExchangeProposedModal: FC<TModalProps> = ({ onClose }) => (
  <Modal onClose={onClose}>
    <div className={styles.container}>
      <img
        src={notificationIcon}
        alt='notification icon'
        className={styles.icon}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>Вы предложили обмен</h2>
        <p className={styles.description}>
          Теперь дождитесь подтверждения. Вам придёт уведомление
        </p>
        <GreenButton className={styles.button} onClick={onClose}>
          Готово
        </GreenButton>
      </div>
    </div>
  </Modal>
);
