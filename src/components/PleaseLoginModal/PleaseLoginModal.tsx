import React from 'react';
import styles from './PleaseLoginModal.module.css';
import userCircle from '../app/assets/static/icons/user-circle.svg';
import { Modal } from '../modal';
import GreenButton from '../buttons/GreenButton';
import GreenBorderButton from '../buttons/GreenBorderButton';
import { ReactComponent as CloseIcon } from '../app/assets/static/icons/close.svg';
import { useNavigate } from 'react-router-dom';

type PleaseLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void; // опционально: позволяет переопределить дефолт
};

export const PleaseLoginModal: React.FC<PleaseLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login');
    }
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.close} onClick={onClose} aria-label="Закрыть" type="button">
          <CloseIcon />
        </button>

        <div className={styles.iconCircle} aria-hidden="true">
          <img src={userCircle} alt="" width={100} height={100} />
        </div>

        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h2 className={styles.title}>Пожалуйста, войдите в аккаунт</h2>
            <p className={styles.subtitle}>
              Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
            </p>
          </div>

          <div className={styles.buttonsRow}>
            <GreenBorderButton onClick={onClose} type="button" className={styles.btnSecondary}>
              Отмена
            </GreenBorderButton>
            <GreenButton onClick={handleLogin} type="button" className={styles.btnPrimary}>
              Войти
            </GreenButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PleaseLoginModal;


