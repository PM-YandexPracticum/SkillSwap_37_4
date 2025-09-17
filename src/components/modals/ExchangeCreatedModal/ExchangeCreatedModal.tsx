import { FC } from 'react';
import { Modal, TModalProps } from '../../../components/modal';
import successIcon from '../../../components/app/assets/static/icons/done.svg';
import styles from './ExchangeCreatedModal.module.css';
import GreenButton from '../../buttons/GreenButton';

export const ExchangeCreatedModal: FC<TModalProps> = ({ onClose }) => (
  <Modal onClose={onClose}>
    <div className={styles.container}>
      <img src={successIcon} alt='success icon' className={styles.icon} />
      <div className={styles.content}>
        <h2 className={styles.title}>Ваше предложение создано</h2>
        <p className={styles.description}>
          Теперь вы можете предложить обмен
        </p>
        <GreenButton className={styles.button} onClick={onClose}>
          Готово
        </GreenButton>
      </div>
    </div>
  </Modal>
);