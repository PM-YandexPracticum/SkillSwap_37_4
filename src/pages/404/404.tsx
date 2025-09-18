import { FC } from 'react';
import { ErrorPageUI } from '../../components/ui/pages/errorPage';
import errorImage404 from '../../components/app/assets/static/404/error404.png';
import GreenBorderButton from '../../components/buttons/GreenBorderButton';
import GreenButton from '../../components/buttons/GreenButton';
import { useLocation, useNavigate } from 'react-router-dom';

export const NotFound404: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const handleReportError = () => {
    console.log('Report error 404 ', currentPath);
  };

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <ErrorPageUI
      imageSrc={errorImage404}
      title={'Страница не найдена'}
      message={
        'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже'
      }
    >
      <GreenBorderButton onClick={handleReportError}>
        Сообщить об ошибке
      </GreenBorderButton>
      <GreenButton onClick={handleRedirect}>На главную</GreenButton>
    </ErrorPageUI>
  );
};
