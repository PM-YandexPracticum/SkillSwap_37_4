import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';
import { Input } from '../../components/input/Input';
import { DatePickerComponent } from '../../components/calendar/DataPicker';
import { DropDown } from '../../components/DropDown';
import GreenButton from '../../components/buttons/GreenButton';
import { SKILL_CATEGORY } from '../../const/skillsCategoryMapping';
import styles from './RegisterStepSecondForm.module.css';
import { setRegisterData, resetRegisterData } from '../../services/slices/registerSlice';

interface RegisterStepSecondFormProps {
  onNext: () => void;
  onPrev: () => void;
}

export type CategoryType = string;
export type SubcategoryType = string;
//categories: keyof typeof SKILL_CATEGORY | '';

interface FormData {
  avatar: string;
  name: string;
  date: string;
  gender: string;
  city: string;
  categories: CategoryType;
  subcategories: SubcategoryType;
}

const RegisterStepSecondForm: React.FC<RegisterStepSecondFormProps> = ({ onNext, onPrev }) => {
  const dispatch = useDispatch();
  const registerData = useSelector((state: RootState) => state.register);
  const [formData, setFormData] = useState<FormData>({
    avatar: '',
    name: '',
    date: '',
    gender: 'Не указан',
    city: 'Не указан',
    categories: '' as CategoryType,
    subcategories: '',
  });

  useEffect(() => {
    return () => {
      dispatch(resetRegisterData());
    };
  }, [dispatch]);

  useEffect(() => {
    // Преобразуем данные перед установкой
    const mergedData: FormData = {
      ...formData,
      ...{
        avatar: registerData.avatar || '',
        name: registerData.name || '',
        date: registerData.dateOfBirth || '',
        gender: registerData.gender || 'Не указан',
        city: registerData.city || 'Не указан',
        categories: registerData.categories || ('' as CategoryType),
        subcategories: registerData.subcategories || ('' as SubcategoryType),
        },
    };
    
    setFormData(mergedData);
  }, [registerData, formData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        avatar: url,
      });
      dispatch(setRegisterData({ avatar: url }));
    }
  };

  // Обработка изменений
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    dispatch(setRegisterData({ [name]: value }));
  };

  const handleCategoryChange = (category: CategoryType) => {
    setFormData(prev => ({
      ...prev,
      categories: category,
      subcategories: '',
    }));
    dispatch(setRegisterData({ categories: category }));
  };

  const handleSubcategoryChange = (subcategory: SubcategoryType) => {
    setFormData(prev => ({
      ...prev,
      subcategories: subcategory,
    }));
    dispatch(setRegisterData({ subcategories: subcategory }));
  };

  // Валидация и отправка
  const isContinueButtonDisabled = !formData.categories;

  const handleNext = () => {
    // Валидация формы
    if (!formData.name || !formData.date || !formData.categories) {
      alert('Заполните все обязательные поля');
      return;
    }
    onNext();
  };

  const handleBack = () => {
    onPrev();
  };

  function handleSubmit(onSubmit: any): (() => void) | undefined {
    throw new Error('Function not implemented.');
  }

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

export default RegisterStepSecondForm;
