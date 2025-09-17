import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TUser, UserMenuProps } from '../../types/user';
import { Moon, Sun, User as UserIcon } from 'lucide-react';
import { GreenBorderButton } from '../buttons/GreenBorderButton';
import { GreenButton } from '../buttons/GreenButton';
import { useSelector } from '../../services/store/store';
import './UserMenu.css';

export const UserMenu: React.FC<UserMenuProps> = ({ 
  onThemeToggle, 
  isDarkTheme 
}) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const user: TUser | null = null;

  const handleProfileClick = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
  };

  const handleLogoutClick = () => {
    // Логика выхода
    console.log('Logout clicked');
    setIsUserMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  const handleAvatarClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Закрытие меню при клике вне его
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  if (user && (user as TUser).isAuthenticated) {
    // Рендер для авторизованного пользователя
    return (
      <div className="user-menu-container">
        <button 
          className="theme-toggle-btn"
          onClick={onThemeToggle}
          aria-label="Переключить тему"
        >
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div 
          className="user-avatar"
          onClick={handleAvatarClick}
        >
          {(user as TUser).avatar ? (
            <img 
              src={(user as TUser).avatar} 
              alt={`Аватар ${(user as TUser).name}`}
              className="avatar-image"
            />
          ) : (
            <UserIcon size={24} />
          )}
        </div>
        
        {isUserMenuOpen && (
          <div ref={userMenuRef} className="user-dropdown-menu">
            <button 
              className="dropdown-item"
              onClick={handleProfileClick}
            >
              Личный кабинет
            </button>
            <button 
              className="dropdown-item"
              onClick={handleLogoutClick}
            >
              Выйти из аккаунта
            </button>
          </div>
        )}
      </div>
    );
  }

  // Рендер для неавторизованного пользователя
  return (
    <div className="user-menu-container">
      <button 
        className="theme-toggle-btn"
        onClick={onThemeToggle}
        aria-label="Переключить тему"
      >
        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <div className="auth-buttons">
        <GreenBorderButton 
          onClick={handleLoginClick}
        >
          Войти
        </GreenBorderButton>
        <GreenButton 
          onClick={handleRegisterClick}
        >
          Зарегистрироваться
        </GreenButton>
      </div>
    </div>
  );
};

