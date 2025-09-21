import { useEffect, useState } from 'react';
import GreenButton from '../buttons/GreenButton';
import { Input } from '../input/Input';
import { PasswordField } from '../passwordField/PasswordField';
import styles from './LoginForm.module.css';
import googleIcon from "../../../src/components/app/assets/static/icons/Google.svg";
import appleIcon from "../../../src/components/app/assets/static/icons/Apple.svg";

export const LoginForm = () => {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});  
  const [isFormValid, setIsFormValid] = useState(false);

  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      if(touched.email) newErrors.email = 'Неверный формат email';
    }

    if (passwordValue.length < 8) {
     if(touched.password) newErrors.password = 'Пароль должен содержать не менее 8 знаков';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length !== 0)

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true });
    validate();
  };

  useEffect(() => {
    validate();
  }, [emailValue, passwordValue, touched]);

  
  return (
    <div className={styles.login__form}>
      <div className={styles.social_button__container}>
        <button className={styles.social__button}>
          <span><img src={googleIcon} alt="Google Icon" /></span>
        Продолжить с Google</button>
        <button className={styles.social__button}>
          <span><img src={appleIcon} alt="Apple Icon" /></span>
        Продолжить с Apple</button>
      </div>
      <div className={styles.form_divider}>или</div>
      <form className={styles.form__inputs} onSubmit={handleSubmit}>
        <Input label="Email" value={emailValue}
    error={errors.email}  onChange={e =>{ setEmailValue(e.target.value);}}  placeholder='Введите email' className={styles.text__input}/>
        <PasswordField value={passwordValue} onChange={e =>{ setPasswordValue(e.target.value);}}/>
        {errors.password && (
          <span className={styles.errorText}>{errors.password}</span>
        )}
        <GreenButton disabled={isFormValid} className={styles.confirm_button} type="submit">Далее</GreenButton>
      </form>
    </div>
  )

}