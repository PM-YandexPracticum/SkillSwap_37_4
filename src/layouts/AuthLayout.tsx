import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/logo/Logo';
import { CloseButton } from '../components/buttons/CloseButton/CloseButton';

export const AuthLayout: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <header style={{
        backgroundColor: '#f9faf7',
        boxSizing: 'border-box',
        padding: '36px',
        height: '84px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Logo />
        <CloseButton onClick={() => navigate('/')} />
      </header>
      <Outlet />
    </>
  );
};

export default AuthLayout;


