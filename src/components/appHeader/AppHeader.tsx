import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from '../ui/logo/Logo';
import { HeaderLinks } from '../ui/headerLinks/HeaderLinks';
import styles from './AppHeader.module.css';
import { Input } from '../input/Input';
import { SearchIcon } from 'lucide-react';
import { UserMenu } from '../UserMenu';
import { nanoid } from '@reduxjs/toolkit';
import clsx from "clsx";
import { useEffect } from "react";
import TransparentButton from "../buttons/TransparentButton";
import { CloseButton } from "../buttons/CloseButton/CloseButton";

export type THeaderProps = {
  userAuth?: boolean;
};


export const AppHeader: React.FC<THeaderProps> = ({ userAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = () => {
    navigate('/');
  };

  if (location.pathname === "/registration") {
    return (
      <header className={clsx(styles.header, styles.header_register)}>
        <Logo onClick={handleRedirect} />
        <CloseButton onClick={handleRedirect} />
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <Logo onClick={handleRedirect} />
      <HeaderLinks />
      <Input
        placeholder="Искать навык"
        leftIcon={<SearchIcon width={24} height={24} />}
        className={styles.headerSearchInput}
        fields__container={styles.Input}
        id={nanoid()}
      />
      <UserMenu
        onThemeToggle={() => {
          console.log("представьте, что тема изменилась))");
        }}
        isDarkTheme={false}
      />
    </header>
  );
};