import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileActionMenu.module.css';
import { ReactComponent as LogoutIcon } from '../app/assets/static/icons/logout.svg';
import { useDispatch } from '../../services/store/store';
import { logoutUserThunk } from '../../services/slices/userSlice/userSlice';

interface ProfileActionMenuProps {
  // В будущем сюда можно добавить пропсы
}

export const ProfileActionMenu: React.FC<ProfileActionMenuProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToProfile = () => {
    navigate('/profile/details');
  };

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate('/');
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
