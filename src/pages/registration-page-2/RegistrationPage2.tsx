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

const RegisterStepSecond: React.FC = () => {
  const [formData, setFormData] = useState({
    avatar: '',
    name: '',
    date: '',
    gender: 'Не указан',
    city: 'Не указан',
    categories: [],
    subcategories: [],
  });

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
