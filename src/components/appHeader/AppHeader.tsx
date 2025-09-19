import { useState } from 'react';
import { Logo } from '../ui/logo/Logo';
import { HeaderLinks } from '../ui/headerLinks/HeaderLinks';
import styles from './AppHeader.module.css';
import { Input } from '../input/Input';
import { SearchIcon } from 'lucide-react';
import { UserMenu } from '../UserMenu';
import { nanoid } from '@reduxjs/toolkit';

type Ttext = {
  OBOUT: string;
};

export type THeaderProps = {
  userAuth: boolean;
};

export const AppHeader: React.FC<THeaderProps> = ({ userAuth }) => {
  return (
    <header className={styles.header}>
      <Logo />
      <HeaderLinks />
      <Input
        placeholder='Искать навык'
        leftIcon={<SearchIcon width={24} height={24} />}
        className={styles.headerSearchInput}
        classNameInput={styles.Input}
        id={nanoid()}
      />
      <UserMenu
        onThemeToggle={function (): void {
          console.log('представте что тема изменилась))');
        }}
        isDarkTheme={false}
      />
    </header>
  );
};
