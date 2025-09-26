import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/appHeader/AppHeader';
import { AppFooter } from '../components/appFooter/AppFooter';

export const DefaultLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default DefaultLayout;


