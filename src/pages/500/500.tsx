import { FC } from 'react';
import { ErrorPageUI } from '../../components/ui/pages/errorPage';
import errorImage500 from '../../components/app/assets/static/500/error500.png';
import GreenBorderButton from '../../components/buttons/GreenBorderButton';
import GreenButton from '../../components/buttons/GreenButton';
import { useLocation, useNavigate } from 'react-router-dom';

export const InternalError500: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const handleReportError = () => {
    console.log('Report error 500 ', currentPath);
  };

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <ErrorPageUI
      imageSrc={errorImage500}
      title={'На сервере произошла ошибка'}
      message={'Попробуйте позже или вернитесь на главную страницу'}
    >
      <GreenBorderButton onClick={handleReportError}>
        Сообщить об ошибке
      </GreenBorderButton>
      <GreenButton onClick={handleRedirect}>На главную</GreenButton>
    </ErrorPageUI>
  );
};
