import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileActionMenu.module.css';

interface ProfileActionMenuProps {
  // В будущем сюда можно добавить пропсы
}

const ProfileActionMenu: React.FC<ProfileActionMenuProps> = () => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate('/profile');
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
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.86782 22H8.99441C13.3177 22 15.4014 20.296 15.7617 16.4791C15.8006 16.0798 15.5085 15.7196 15.0996 15.6806C14.7101 15.6417 14.3401 15.9435 14.3011 16.3427C14.0187 19.4002 12.5777 20.5394 8.98467 20.5394H8.85809C4.89509 20.5394 3.49295 19.1373 3.49295 15.1743V8.82571C3.49295 4.86271 4.89509 3.46056 8.85809 3.46056H8.98467C12.5971 3.46056 14.0382 4.61928 14.3011 7.73515C14.3498 8.13437 14.6906 8.43622 15.0996 8.39727C15.5085 8.36806 15.8006 8.00779 15.7714 7.60857C15.4404 3.7332 13.3469 2 8.99441 2H8.86782C4.08691 2 2.04212 4.04479 2.04212 8.82571V15.1743C2.04212 19.9552 4.08691 22 8.86782 22Z'
              fill='#253017'
            />
            <path
              d='M9.10101 12.7301H20.1818C20.581 12.7301 20.9121 12.399 20.9121 11.9998C20.9121 11.6006 20.581 11.2695 20.1818 11.2695H9.10101C8.70179 11.2695 8.37073 11.6006 8.37073 11.9998C8.37073 12.399 8.70179 12.7301 9.10101 12.7301Z'
              fill='#253017'
            />
            <path
              d='M18.0102 15.9918C18.1952 15.9918 18.3802 15.9236 18.5263 15.7775L21.7882 12.5156C22.0706 12.2332 22.0706 11.7659 21.7882 11.4835L18.5263 8.22155C18.2439 7.93917 17.7765 7.93917 17.4942 8.22155C17.2118 8.50392 17.2118 8.9713 17.4942 9.25368L20.24 11.9995L17.4942 14.7454C17.2118 15.0278 17.2118 15.4952 17.4942 15.7775C17.6305 15.9236 17.8252 15.9918 18.0102 15.9918Z'
              fill='#253017'
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default ProfileActionMenu;
