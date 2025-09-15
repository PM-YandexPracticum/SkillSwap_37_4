import { FC, memo, useEffect } from 'react';
import { ReactNode } from 'react';
import styles from './modal.module.css';

export type TModalProps = {
  onClose: () => void;
  children?: ReactNode;
};

export const Modal: FC<TModalProps> = memo(({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
      <div className={styles.overlay} onClick={handleBackdropClick} />
    </>
  );
});
