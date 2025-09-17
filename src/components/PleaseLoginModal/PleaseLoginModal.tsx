import React, { useEffect, useRef } from 'react';
import styles from './PleaseLoginModal.module.css';
import userCircle from '../app/assets/static/icons/user-circle.svg';

type PleaseLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
};

export const PleaseLoginModal: React.FC<PleaseLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    // Простой фокус на крестик, без сложной ловушки фокуса
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef} role="dialog" aria-modal="true">
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
          ref={closeBtnRef}
        >
          ×
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
            <button className={styles.btnSecondary} onClick={onClose} type="button">
              Отмена
            </button>
            <button className={styles.btnPrimary} onClick={onLogin} type="button">
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PleaseLoginModal;


