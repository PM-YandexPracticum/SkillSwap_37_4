import { FC, memo } from 'react';
import { ReactNode } from 'react';
import styles from './modal.module.css';

export type TModalProps = {
  onClose: () => void;
  children?: ReactNode;
};

export const Modal: FC<TModalProps> = memo(({ onClose, children }) => (
  <>
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
    <div className={styles.overlay} onClick={onClose} />
  </>
));