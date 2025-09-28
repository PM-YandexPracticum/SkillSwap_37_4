import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TUser, UserMenuProps } from '../../types/user';
import { GreenBorderButton } from '../buttons/GreenBorderButton';
import { useSelector } from '../../services/store/store';
import './UserMenu.css';
import { ReactComponent as UserIcon } from '../app/assets/static/icons/user-circle.svg';
import { ReactComponent as Sun } from '../app/assets/static/icons/sun.svg';
import { ReactComponent as Moon } from '../app/assets/static/icons/moon.svg';
import { ReactComponent as Bell } from '../app/assets/static/icons/bell.svg';
import { ReactComponent as Heart } from '../app/assets/static/icons/heart.svg';
import GreenButton from '../buttons/GreenButton';
import { ProfileActionMenu } from '../ProfileActionMenu';

export const UserMenu: React.FC<UserMenuProps> = ({
  onThemeToggle,
  isDarkTheme
}) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const user: TUser | null = null;
    {/*const user: TUser= {
      id: '123',
      name: 'aziz',
      email: '12',
      isAuthenticated: true,
      avatar: "https://i.ytimg.com/vi/2mcK35I8sXE/maxresdefault.jpg"
    };*/}

  const handleProfileClick = () => {
    // navigate('/profile');
    setIsProfileMenuOpen(true);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  const handleNotificationsClick = () => {
    // Логика для уведомлений
    console.log('Notifications clicked');
  };

  const handleLikesClick = () => {
    // Логика для лайков
    console.log('Likes clicked');
  };

  const handleDocumentClick = (event: MouseEvent) => {
    // Проверяем, что target существует и является элементом DOM
    if (
      isProfileMenuOpen &&
      event.target &&
      !(event.target as HTMLElement).closest('.user-profile-block')
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isProfileMenuOpen]);

  if (user && (user as TUser).isAuthenticated) {
    // Рендер для авторизованного пользователя
    return (
      <div className='user-menu authenticated'>
        <div className='user-menu__actions'>
          <button
            className='theme-toggle-btn'
            onClick={onThemeToggle}
            aria-label='Переключить тему'
          >
            {isDarkTheme ? <Sun /> : <Moon />}
          </button>

          <button
            className='notification-btn'
            onClick={handleNotificationsClick}
            aria-label='Уведомления'
          >
            <Bell />
          </button>

          <button
            className='likes-btn'
            onClick={handleLikesClick}
            aria-label='Лайки'
          >
            <Heart />
          </button>
        </div>

        <div className='user-profile-block' onClick={handleProfileClick}>
          <p className='user-name'>{(user as TUser).name}</p>
          {(user as TUser).avatar ? (
            <img
              src={(user as TUser).avatar}
              alt={`Аватар ${(user as TUser).name}`}
              className='avatar-image'
            />
          ) : (
            <UserIcon />
          )}
        </div>
        {isProfileMenuOpen && (
          <div className='profile-menu-overlay'>
            <ProfileActionMenu />
          </div>
        )}
      </div>
    );
  }

  // Рендер для неавторизованного пользователя
  return (
    <div className='user-menu unauthenticated'>
      <button
        className='theme-toggle-btn'
        onClick={onThemeToggle}
        aria-label='Переключить тему'
      >
        {isDarkTheme ? <Sun /> : <Moon />}
      </button>

      <div className='auth-buttons'>
        <GreenBorderButton onClick={handleLoginClick}>Войти</GreenBorderButton>
        <GreenButton onClick={handleRegisterClick}>
          Зарегистрироваться
        </GreenButton>
      </div>
    </div>
  );
};
