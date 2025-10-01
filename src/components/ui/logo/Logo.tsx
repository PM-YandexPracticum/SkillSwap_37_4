import styles from './Logo.module.css';

interface LogoProps {
  onClick?: () => void;
}

export const Logo = ({ onClick }: LogoProps) => (
  <div className={styles.logoContainer} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <div className={styles.logoWrapper}>
      <div className={styles.logoCircle} />
      <div className={styles.logoIcon} />
    </div>
    <span className={styles.logoText}>SkillSwap</span>
  </div>
);
