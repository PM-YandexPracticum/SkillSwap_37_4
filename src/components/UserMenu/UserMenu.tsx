import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TUser, UserMenuProps } from '../../types/user';
import { Moon, Sun, Bell, Heart, User as UserIcon } from 'lucide-react';
import './UserMenu.css';

export const UserMenu: React.FC<UserMenuProps> = ({ 
  user, 
  onThemeToggle, 
  isDarkTheme 
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
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

  if (user && user.isAuthenticated) {
    // Рендер для авторизованного пользователя
    return (
      <div className="user-menu authenticated">
        <div className="user-menu__actions">
          <button 
            className="theme-toggle-btn"
            onClick={onThemeToggle}
            aria-label="Переключить тему"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="notification-btn"
            onClick={handleNotificationsClick}
            aria-label="Уведомления"
          >
            <Bell size={20} />
          </button>
          
          <button 
            className="likes-btn"
            onClick={handleLikesClick}
            aria-label="Лайки"
          >
            <Heart size={20} />
          </button>
        </div>
        
        <div 
          className="user-profile-block"
          onClick={handleProfileClick}
        >
          <div className="user-avatar">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={`Аватар ${user.name}`}
                className="avatar-image"
              />
            ) : (
              <UserIcon size={24} />
            )}
          </div>
          <span className="user-name">{user.name}</span>
        </div>
      </div>
    );
  }

  // Рендер для неавторизованного пользователя
  return (
    <div className="user-menu unauthenticated">
      <button 
        className="theme-toggle-btn"
        onClick={onThemeToggle}
        aria-label="Переключить тему"
      >
        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <div className="auth-buttons">
        <button 
          className="login-btn"
          onClick={handleLoginClick}
        >
          Войти
        </button>
        <button 
          className="register-btn"
          onClick={handleRegisterClick}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};
