import styles from './Copyright.module.css';

export const Copyright = () => (
  <p className={styles.copyright}>SkillSwap — {new Date().getFullYear()}</p>
);
