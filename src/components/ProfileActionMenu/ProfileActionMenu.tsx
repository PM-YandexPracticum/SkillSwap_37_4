import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileActionMenu.module.css';
import { ReactComponent as LogoutIcon } from '../app/assets/static/icons/logout.svg';

interface ProfileActionMenuProps {
  // В будущем сюда можно добавить пропсы
}

export const ProfileActionMenu: React.FC<ProfileActionMenuProps> = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/profile/details');
  };

  const handleLogout = () => {
    // Здесь в будущем будет логика выхода из аккаунта
    console.log('Выход из аккаунта...');
  };

  return (
    <div className={styles.profileActionMenu}>
      <button
        type='button'
        className={styles.menuItem}
        onClick={handleNavigateToProfile}
      >
        Личный кабинет
      </button>
      <button type='button' className={styles.menuItem} onClick={handleLogout}>
        Выйти из аккаунта
        <span>
          <LogoutIcon />
        </span>
      </button>
    </div>
  );
};

export default ProfileActionMenu;
