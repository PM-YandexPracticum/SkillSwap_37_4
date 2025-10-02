import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FooterLinks } from '../ui/footerLinks/FooterLinks';
import { Logo } from '../ui/logo/Logo';
import styles from './AppFooter.module.css';

export const AppFooter = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const location = useLocation();

  if (location.pathname === '/register') {
    return null;
  }
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.left_block}>
        <Logo onClick={handleLogoClick} />
        <p className={styles.time}>SkillSwap - {year}</p>
      </div>
      <div className={styles.right_block}>
        <FooterLinks />
      </div>
    </div>
  );
};
