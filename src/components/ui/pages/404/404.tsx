import errorImage404 from '../../../app/assets/static/404/error404.png';
import GreenBorderButton from '../../../buttons/GreenBorderButton';
import GreenButton from '../../../buttons/GreenButton';
import styles from './404.module.css';

export const NotFound404UI = () => {
  return (
    <div className={styles.container}>
      <div>
        <img src={errorImage404} alt='Ошибка 404' />
      </div>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h2>Страница не найдена</h2>
          <p>
            К сожалению, эта страница недоступна. Вернитесь на главную страницу
            или попробуйте позже
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <GreenBorderButton children='Сообщить об ошибке' />
          <GreenButton
            children='На главную'
            onClick={() => (window.location.href = '/')}
          />
        </div>
      </div>
    </div>
  );
};