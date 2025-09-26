import React, { useState } from 'react';
import { Input } from 'src/components/input/Input';
import { DatePickerComponent } from 'src/components/calendar/DataPicker';
import { DropDown } from 'src/components/DropDown';
import GreenButton from 'src/components/buttons/GreenButton';
import { SKILL_CATEGORY } from 'src/const/skillsCategoryMapping';
import iconCalendar from 'src/components/app/assets/static/iconsUi/calendar.svg';
import iconPlus from 'src/components/app/assets/static/iconsUi/add.svg';
import iconUserInfo from 'src/components/app/assets/static/images/userInfo.svg';
import styles from './RegisterForm.module.css';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'src/components/input/Input';
import { DatePickerComponent } from '../calendar/DataPicker';
import { DropDown } from 'src/components/DropDown';
import GreenButton from 'src/components/buttons/GreenButton';
import { SKILL_CATEGORY } from 'src/const/skillsCategoryMapping';
import styles from './RegisterStepSecondForm.module.css';
import { setRegisterData, resetRegisterData } from 'src/store/slices/registerSlice';

interface RegisterStepSecondFormProps {
 onNext: () => void;
 onPrev: () => void;
}

const RegisterStepSecondForm: React.FC<RegisterStepSecondFormProps> = ({ onNext, onPrev }) => {
 const dispatch = useDispatch();
 const registerData = useSelector((state) => state.register);

 // Локальные состояния
 const [avatar, setAvatar] = useState('');
 const [name, setName] = useState('');
 const [date, setDate] = useState('');
 const [gender, setGender] = useState('Не указан');
 const [city, setCity] = useState('Не указан');
 const [selectedCategory, setSelectedCategory] = useState<keyof typeof SKILL_CATEGORY | ''>('');
 const [selectedSubcategory, setSelectedSubcategory] = useState('');

 useEffect(() => {
 return () => {
 dispatch(resetRegisterData());
 };
 }, [dispatch]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 const { name: inputName, value } = e.target;
 switch (inputName) {
 case 'name':
 setName(value);
 dispatch(setRegisterData({ name: value }));
 break;
 case 'date':
 setDate(value);
 dispatch(setRegisterData({ date: value }));
 break;
 case 'gender':
 setGender(value);
 dispatch(setRegisterData({ gender: value }));
 break;
 case 'city':
 setCity(value);
 dispatch(setRegisterData({ city: value }));
 break;
 default:
 break;
 }
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const file = e.target.files?.[0];
 if (file) {
 setAvatar(URL.createObjectURL(file));
 dispatch(setRegisterData({ avatar: URL.createObjectURL(file) }));
 }
 };

 const handleCategoryChange = (category: keyof typeof SKILL_CATEGORY) => {
 setSelectedCategory(category);
 dispatch(setRegisterData({ categories: category }));
 };

 const handleSubcategoryChange = (subcategory: string) => {
 setSelectedSubcategory(subcategory);
 dispatch(setRegisterData({ subcategories: subcategory }));
 };

 const isContinueButtonDisabled = !selectedCategory;

 const handleNext = () => {
 // Здесь можно добавить валидацию формы перед переходом
 onNext();
 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  const isContinueButtonDisabled = !formData.categories.length;
  const onSubmit = () => {};
  const handleBack = () => {};

  return (
    <form className={styles.registerForm}>
      <div className={styles.formGroup}>
        <input
          type='file'
          name='avatar'
          id='avatar'
          accept='image/*'
          onChange={handleFileChange}
        />
        <label htmlFor='avatar'>Загрузить аватар</label>
      </div>

      <div className={styles.formGroup}>
        <Input
          type='text'
          id='name'
          title='Имя'
          placeholder='Введите ваше имя'
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <DatePickerComponent
          id='date'
          title='Дата рождения'
          placeholder='дд.мм.гггг'
          value={formData.date}
          onChange={(date) => setFormData({ ...formData, date })}
        />
      </div>

      <div className={styles.formGroup}>
        <select
          name='gender'
          id='gender'
          title='Пол'
          value={formData.gender}
          onChange={handleChange}
        >
          <option value='Не указан'>Не указан</option>
          <option value='Мужской'>Мужской</option>
          <option value='Женский'>Женский</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <select
          name='city'
          id='city'
          title='Город'
          value={formData.city}
          onChange={handleChange}
        >
          <option value='Не указан'>Не указан</option>
          {/* Здесь должен быть список городов */}
        </select>
      </div>

      <div className={styles.formGroup}>
        <DropDown
          name='categories'
          title='Категория навыка'
          id='skill'
          placeholder='Выберите категорию'
          options={SKILL_CATEGORY}
          value={formData.categories}
          onChange={(value) => setFormData({ ...formData, categories: value })}
        />
      </div>

      <div className={styles.formGroup}>
        <DropDown
          name='subcategories'
          title='Подкатегория навыка'
          id='subSkill'
          placeholder='Выберите подкатегорию'
          options={/* Зависит от выбранной категории */}
          value={formData.subcategories}
          onChange={(value) => setFormData({ ...formData, subcategories: value })}
        />
        {isContinueButtonDisabled && <p className={styles.error}>Сначала выберите категорию</p>}
      </div>

      <div className={styles.buttonGroup}>
        <GreenButton className={styles.back_button} onClick={handleBack} type="submit">Назад</GreenButton>
        <GreenButton disabled={isFormValid} className={styles.confirm_button} onClick={handleSubmit(onSubmit) type="submit">Продолжить</GreenButton>
      </div>
    </form>
  );
};

export default RegisterStepSecond;
