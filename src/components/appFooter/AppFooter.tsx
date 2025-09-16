import { FooterLinks } from '../shared/ui/footerLinks/FooterLinks';
import { Logo } from '../shared/ui/logo/Logo';
import styles from './AppFooter.module.css';

export const AppFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div className={styles.left_block}>
        <Logo />
        <p className={styles.time}>SkillSwap - {year}</p>
      </div>
      <div className={styles.right_block}>
        <FooterLinks />
      </div>
    </div>
  );
};
