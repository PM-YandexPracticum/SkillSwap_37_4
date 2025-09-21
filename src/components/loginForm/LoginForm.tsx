import { useState } from 'react';
import GreenButton from '../buttons/GreenButton';
import { Input } from '../input/Input';
import { PasswordField } from '../passwordField/PasswordField';
import styles from './LoginForm.module.css';

export const LoginForm = () => {

  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div className={styles.login__form}>
      <div className={styles.social_button__container}>
        <button className={styles.social__button}>
          <span><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.5002 12.7658C24.5002 11.7792 24.4185 11.0592 24.2417 10.3125H12.7451V14.7658H19.4934C19.3574 15.8725 18.6227 17.5392 16.99 18.6591L16.9671 18.8082L20.6021 21.5679L20.854 21.5925C23.1668 19.4991 24.5002 16.4191 24.5002 12.7658Z" fill="#4285F4" />
            <path d="M12.745 24.4997C16.051 24.4997 18.8265 23.433 20.8538 21.593L16.9898 18.6596C15.9558 19.3663 14.568 19.8596 12.745 19.8596C9.50688 19.8596 6.75861 17.7664 5.77892 14.873L5.63532 14.885L1.85558 17.7517L1.80615 17.8863C3.81974 21.8063 7.9558 24.4997 12.745 24.4997Z" fill="#34A853" />
            <path d="M5.77886 14.8731C5.52036 14.1265 5.37076 13.3264 5.37076 12.4998C5.37076 11.6731 5.52036 10.8731 5.76526 10.1264L5.75841 9.96741L1.93131 7.05469L1.80609 7.11306C0.976196 8.73974 0.5 10.5664 0.5 12.4998C0.5 14.4331 0.976196 16.2597 1.80609 17.8864L5.77886 14.8731Z" fill="#FBBC05" />
            <path d="M12.745 5.13997C15.0442 5.13997 16.5952 6.1133 17.4796 6.92669L20.9354 3.62C18.813 1.68667 16.051 0.5 12.745 0.5C7.9558 0.5 3.81974 3.19331 1.80615 7.11328L5.76532 10.1267C6.75861 7.23333 9.50688 5.13997 12.745 5.13997Z" fill="#EB4335" />
          </svg></span>
        Продолжить с Google</button>
        <button className={styles.social__button}>
          <span><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6545 6.27578C11.3986 4.8804 12.0583 3.44439 12.8529 2.47664C13.7286 1.40885 15.2314 0.589988 16.5157 0.5C16.7326 1.96297 16.1356 3.38836 15.3497 4.3966C14.5066 5.47974 13.0571 6.3197 11.6545 6.27578ZM19.1875 11.332C19.5849 10.2233 20.3722 9.22577 21.5935 8.55273C20.3593 7.0126 18.6265 6.11845 16.9912 6.11845C14.8277 6.11845 13.9129 7.14923 12.4102 7.14923C10.8621 7.14923 9.68774 6.11845 7.81372 6.11845C5.97605 6.11845 4.01993 7.23851 2.77935 9.15142C2.32321 9.8585 2.01422 10.7369 1.8457 11.7153C1.3781 14.46 2.07659 18.035 4.16018 21.2094C5.17325 22.7497 6.52359 24.4847 8.28766 24.4998C9.85912 24.5152 10.3049 23.4951 12.4323 23.4846C14.5628 23.4725 14.9666 24.5104 16.5359 24.4954C18.3005 24.4805 19.7252 22.5604 20.7383 21.0203C21.4596 19.9151 21.7324 19.3568 22.2933 18.1073C19.4412 17.0317 18.2681 13.8889 19.1875 11.332Z" fill="#253017" />
          </svg></span>
        Продолжить с Apple</button>
      </div>
      <div className={styles.form_divider}>или</div>
      <div className={styles.form__inputs}>
        <Input label="Email" placeholder='Введите email' className={styles.text__input}/>
        <PasswordField value={passwordValue} onChange={e =>{ setPasswordValue(e.target.value)}}/>
        <GreenButton className={styles.confirm_button} type="button">Далее</GreenButton>
      </div>
    </div>
  )

}