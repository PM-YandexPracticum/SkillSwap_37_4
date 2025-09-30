import { useSelector } from '../../services/store/store';
import { Navigate, useLocation } from 'react-router';
// import { Preloader } from '../ui/preloader';//todo
// import {
//   userAuthCheckedSelector,
//   userDataSelector
// } from './../../services/slices/UserSlice/UserSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  // очень простая студенческая реализация без сложных селекторов
  // берём пользователя напрямую из стора, если есть
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = useSelector((state: any) => state.userSlice?.user);
  const location = useLocation();

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/' />;
  }

  return children;
}
