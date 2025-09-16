import styles from './Copyright.module.css';

export const Copyright = () => {
  return (
    <p className={styles.copyright}>SkillSwap — {new Date().getFullYear()}</p>
  );
};