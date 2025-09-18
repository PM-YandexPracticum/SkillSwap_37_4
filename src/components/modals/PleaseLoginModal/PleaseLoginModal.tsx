import React from 'react';
import styles from './PleaseLoginModal.module.css';
import userCircle from '../../app/assets/static/icons/user-circle.svg';
import { Modal } from '../../modal';
import GreenButton from '../../buttons/GreenButton';
import GreenBorderButton from '../../buttons/GreenBorderButton';
import { useNavigate } from 'react-router-dom';

type PleaseLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void; // опционально: позволяет переопределить дефолт
};

export const PleaseLoginModal: React.FC<PleaseLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin
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
      <div className={styles.content}>
        <img
          src={userCircle}
          alt='user-circle-icon'
          className={styles.iconCircle}
        />
        <div className={styles.textBlock}>
          <h2 className={styles.title}>Пожалуйста, войдите в аккаунт</h2>
          <p className={styles.subtitle}>
            Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
          </p>
        </div>
        <div className={styles.buttonsRow}>
          <GreenBorderButton onClick={onClose} className={styles.btnSecondary}>
            Отмена
          </GreenBorderButton>
          <GreenButton onClick={handleLogin} className={styles.btnPrimary}>
            Войти
          </GreenButton>
        </div>
      </div>
    </Modal>
  );
};

export default PleaseLoginModal;
