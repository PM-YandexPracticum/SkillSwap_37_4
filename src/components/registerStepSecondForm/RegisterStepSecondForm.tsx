import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../services/store/store';
import iconPlus from '../app/assets/static/iconsUi/add.svg';
import genderData from '../../const/gender.json';
import townsData from '../../const/towns.json';
import { Input } from '../../components/input/Input';
import { DatePickerComponent } from '../../components/calendar/DataPicker';
import { DropDown } from '../../components/DropDown';
import { DropDownOption } from '../../components/DropDown/DropDown';
import GreenButton from '../../components/buttons/GreenButton';
import GreenBorderButton from '../buttons/GreenBorderButton';
import { SKILL_CATEGORY } from '../../const/skillsCategoryMapping';
import styles from './RegisterStepSecondForm.module.css';
import {
  setRegisterData,
  resetRegisterData,
  GenderType
} from '../../services/slices/registerSlice';
import { errorSelector, userLoadingSelector, userLoginThunk } from '../../services/slices/userSlice/userSlice';

interface RegisterStepSecondFormProps {
  buttonPrevText: string;
  buttonNextText: string;
}

export const RegisterStepSecondForm = memo(
  ({ buttonPrevText, buttonNextText }: RegisterStepSecondFormProps) => {
    const dispatch = useDispatch();
    const registerData = useSelector((state: RootState) => state.register);
    const [selectedCategories, setSelectedCategories] = useState('');
    const [selectedSubcategories, setSelectedSubcategories] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [selectedGender, setSelectedGender] =
      useState<GenderType>('Не указан');
    const navigate = useNavigate();
    const location = useLocation();
    const loading = useSelector(userLoadingSelector);
    const [errors, setErrors] = useState<{ 
      avatar?: string; 
      name?: string;
      dateOfBirth?: string;
      gender?: string;
      city?: string;
      categorySkillToLearn?: string;
      subcategorySkillToLearn?: string
    }>({});  
    const [isFormValid, setIsFormValid] = useState(false);

    const [touched, setTouched] = useState<{ 
      avatar: boolean; 
      name: boolean;
      dateOfBirth: boolean;
      gender: boolean;
      city: boolean;
      categorySkillToLearn: boolean;
      subcategorySkillToLearn: boolean
    }>({
      avatar: false,
      name: false,
      dateOfBirth: false,
      gender: false,
      city: false,
      categorySkillToLearn: false,
      subcategorySkillToLearn: false
    });

    const validate = () => {
      const newErrors: { 
        avatar?: string; 
        name?: string;
        dateOfBirth?: string;
        gender?: string;
        city?: string;
        categorySkillToLearn?: string;
        subcategorySkillToLearn?: string
      } = {};

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        if(touched.email) newErrors.email = 'Неверный формат email';
      }

      if (passwordValue.length < 8) {
      if(touched.password) newErrors.password = 'Пароль должен содержать не менее 8 знаков';
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0)

      return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
      setSelectedGender(registerData.gender || 'Не указан');
    }, [registerData.gender]);

    useEffect(
      () => () => {
        dispatch(resetRegisterData());
      },
      [dispatch]
    );

    const getSubcategories = (): string[] => {
      if (!selectedCategories) return [];
      const categoryData = SKILL_CATEGORY.find(
        (item) => item.categoryName === selectedCategories
      );
      return categoryData?.subcategoryName || [];
    };

    const categoryOptions: DropDownOption[] = SKILL_CATEGORY.map((item) => ({
      value: item.categoryName,
      label: item.categoryName
    }));

    const subcategoryOptions: DropDownOption[] = getSubcategories().map(
      (subcategory) => ({
        value: subcategory,
        label: subcategory
      })
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        dispatch(setRegisterData({ avatar: url }));
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      dispatch(setRegisterData({ [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
      setSelectedCategories(value);
      setSelectedSubcategories('');
      dispatch(setRegisterData({ categorySkillToLearn: value }));
    };

    const handleSubcategoryChange = (value: string) => {
      setSelectedSubcategories(value);
      dispatch(setRegisterData({ subcategorySkillToLearn: value }));
    };

    const handleGenderChange = (value: string) => {
      if (['Мужской', 'Женский', 'Не указан'].includes(value)) {
        setSelectedGender(value as GenderType);
        dispatch(setRegisterData({ gender: value as GenderType }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setTouched({ email: true, password: true });
      if (validate()) {
        const result = await dispatch(userLoginThunk({ email: emailValue, password: passwordValue }));
        
        if (userLoginThunk.fulfilled.match(result)) {
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      }
    };

    const handleNext = () => {
      if (!isFormValid) {
        alert('Заполните все обязательные поля');
        return;
      }
      // Логика перехода к следующему шагу
    };

    const handleBack = () => {
      // Логика перехода к предыдущему шагу
    };

    return (
      <div className={styles.page_container}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.icon__container}>
            <label htmlFor='avatar' className={styles.avatar__label}>
              <input
                type='file'
                name='avatar'
                id='avatar'
                className={styles.avatar__input}
                multiple={false}
                onChange={handleFileChange}
                aria-label='Загрузить аватар'
              />
              {registerData.avatar && (
                <img
                  src={registerData.avatar}
                  alt='Аватар пользователя'
                  className={styles.avatar__preview}
                />
              )}
              <img
                className={styles.avatar__label_plusIcon}
                src={iconPlus}
                alt='Добавить фото'
              />
            </label>
          </div>

          <Input
            label='Имя'
            value={registerData.name}
            placeholder='Введите ваше имя'
            onChange={(e) => handleChange(e)}
            name='name'
            className={styles.input_label}
          />

          <div className={styles.input__drops_container}>
            <div className={styles.input__drops_birthday}>
              <DatePickerComponent
                selectedDate={date}
                setSelectedDate={setDate}
              />
            </div>

            <div className={styles.input__drops_gender}>
              <span className={styles.input__label}>Пол</span>
              <DropDown
                options={genderData}
                value={registerData.gender}
                onChange={handleGenderChange}
                placeholder='Не указан'
              />
            </div>
          </div>

          <div className={styles.input__drops}>
            <span className={styles.input__label}>Город</span>
            <DropDown
              options={townsData}
              value={registerData.city}
              onChange={(value) => dispatch(setRegisterData({ city: value }))}
              placeholder='Не указан'
            />
          </div>

          <div className={styles.input__drops}>
            <span className={styles.input__label}>
              Категория навыка, которому хотите научиться
            </span>
            <DropDown
              placeholder='Выберите категорию'
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleCategoryChange}
            />
          </div>

          <div className={styles.input__drops}>
            <span className={styles.input__label}>
              Подкатегория навыка, которому хотите научиться
            </span>
            <DropDown
              placeholder='Выберите подкатегорию'
              options={subcategoryOptions}
              value={selectedSubcategories}
              onChange={handleSubcategoryChange}
            />
          </div>

          <div className={styles.button__group}>
            <GreenBorderButton
              className={styles.button_width}
              onClick={handleBack}
              disabled={!isFormValid}
            >
              {buttonPrevText}
            </GreenBorderButton>

            <GreenButton
              className={styles.button_width}
              type='submit'
              disabled={!isFormValid || loading} 
            >
              {loading ? 'Вход...' : buttonNextText}
            </GreenButton>
          </div>
        </form>
      </div>
    );
  }
);
