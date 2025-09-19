import styles from './Logo.module.css';

export const Logo = () => (
  <div className={styles.logoContainer}>
    <div className={styles.logoWrapper}>
      <div className={styles.logoCircle} />
      <div className={styles.logoIcon} />
    </div>
    <span className={styles.logoText}>SkillSwap</span>
  </div>
);
