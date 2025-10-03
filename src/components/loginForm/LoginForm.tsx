import { useEffect, useState } from 'react';
import GreenButton from '../buttons/GreenButton';
import { Input } from '../input/Input';
import { PasswordField } from '../passwordField/PasswordField';
import styles from './LoginForm.module.css';
import googleIcon from '../../../src/components/app/assets/static/icons/Google.svg';
import appleIcon from '../../../src/components/app/assets/static/icons/Apple.svg';
import { useDispatch, useSelector } from '../../services/store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  errorSelector,
  userLoadingSelector,
  userLoginThunk
} from '../../services/slices/userSlice/userSlice';

interface LoginFormProps {
  buttonText: string;
}

export const LoginForm = ({ buttonText }: LoginFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(userLoadingSelector);
  const error = useSelector(errorSelector);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    {
      email: false,
      password: false
    }
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      if (touched.email) newErrors.email = 'Неверный формат email';
    }

    if (passwordValue.length < 8) {
      if (touched.password)
        newErrors.password = 'Пароль должен содержать не менее 8 знаков';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ email: true, password: true });
    if (validate()) {
      const result = await dispatch(
        userLoginThunk({ email: emailValue, password: passwordValue })
      );

      if (userLoginThunk.fulfilled.match(result)) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    }
  };

  useEffect(() => {
    validate();
  }, [emailValue, passwordValue, touched]);

  return (
    <div className={styles.login__form}>
      <div className={styles.social_button__container}>
        <button className={styles.social__button}>
          <span>
            <img src={googleIcon} alt='Google Icon' />
          </span>
          Продолжить с Google
        </button>
        <button className={styles.social__button}>
          <span>
            <img src={appleIcon} alt='Apple Icon' />
          </span>
          Продолжить с Apple
        </button>
      </div>
      <div className={styles.form_divider}>или</div>
      <form className={styles.form__inputs} onSubmit={handleSubmit}>
        <Input
          label='Email'
          value={emailValue}
          error={errors.email}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder='Введите email'
          className={styles.text__input}
        />
        <PasswordField
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        {errors.password && (
          <span className={styles.errorText}>{errors.password}</span>
        )}
        {error && <span className={styles.errorText}>{error}</span>}
        <GreenButton
          disabled={!isFormValid || loading}
          className={styles.confirm_button}
          type='submit'
        >
          {loading ? 'Вход...' : buttonText}
        </GreenButton>
      </form>
    </div>
  );
};
