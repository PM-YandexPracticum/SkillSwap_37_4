import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';
import { Input } from '../../components/input/Input';
import { DatePickerComponent } from '../../components/calendar/DataPicker';
import { DropDown } from '../../components/DropDown';
import { DropDownOption } from '../../components/DropDown/DropDown';
import GreenButton from '../../components/buttons/GreenButton';
import GreenBorderButton from '../buttons/GreenBorderButton';
import { SKILL_CATEGORY } from '../../const/skillsCategoryMapping';
import styles from './RegisterStepSecondForm.module.css';
import { setRegisterData, resetRegisterData, CategoryType, SubcategoryType, GenderType } from '../../services/slices/registerSlice';

interface RegisterStepSecondFormProps {
  buttonPrevText: string;
  buttonNextText: string;
}

interface FormData {
  avatar: string;
  name: string;
  dateOfBirth: string;
  gender: GenderType;
  city: string;
  categorySkillToLearn: string;
  subcategorySkillToLearn: string;
  category: CategoryType;
  subcategory: SubcategoryType;
}

export const RegisterStepSecondForm = memo(({ buttonPrevText, buttonNextText }: RegisterStepSecondFormProps) => {
  const dispatch = useDispatch();
  const registerData = useSelector((state: RootState) => state.register);
  const [formData, setFormData] = useState<FormData>({
    avatar: '',
    name: '',
    dateOfBirth: '',
    gender: 'Не указан',
    city: '',
    categorySkillToLearn: '',
    subcategorySkillToLearn: '',
    category: [],
    subcategory: [],
  });

  useEffect(() => {
    return () => {
      dispatch(resetRegisterData());
    };
  }, [dispatch]);

  const [selectedCategories, setSelectedCategories] = useState<string | ''>('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const getSubcategories = (): string[] => {
    if (!selectedCategories) return [];
    const categoryData = SKILL_CATEGORY.find(item => item.categoryName === selectedCategories);
    return categoryData?.subcategoryName || [];
  };
  const [date, setDate] = useState<Date | null>(null);
  
  // Модифицируем получение опций для DropDown
  const categoryOptions: DropDownOption[] = SKILL_CATEGORY.map(item => ({
    value: item.categoryName,
    label: item.categoryName
  }));

  // Аналогично для подкатегорий
  const subcategoryOptions: DropDownOption[] = getSubcategories().map(subcategory => ({
    value: subcategory,
    label: subcategory
  }));

  useEffect(() => {
    return () => {
      dispatch(resetRegisterData());
    };
  }, [dispatch]);

    useEffect(() => {
    setFormData({
      ...formData,
      ...{
        avatar: registerData.avatar || '',
        name: registerData.name || '',
        dateOfBirth: registerData.dateOfBirth || '',
        gender: registerData.gender || 'Не указан',
        city: registerData.city || '',
      },
    });
  }, [registerData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: url });
      dispatch(setRegisterData({ avatar: url }));
    }
  };

  // Обработка изменений
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    dispatch(setRegisterData({ [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategories(value);
    setSelectedSubcategories([]);
    dispatch(setRegisterData({ categorySkillToLearn: value }));
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategories([value]);
    dispatch(setRegisterData({ subcategorySkillToLearn: value }));
  };

  // Валидация и отправка
  const isContinueButtonDisabled = !formData.name || !formData.dateOfBirth;

  const handleNext = () => {
    // Валидация формы
    if (!formData.name || !formData.dateOfBirth) {
      alert('Заполните все обязательные поля');
      return;
    }
    //onNext();
  };

  const handleBack = () => {
    //onPrev();
  };

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
          selectedDate={date}
          setSelectedDate={setDate}
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
          placeholder="Выберите категорию"
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleCategoryChange}
        />
      </div>

      <div className={styles.formGroup}>
        <DropDown
          placeholder="Выберите подкатегорию"
          options={subcategoryOptions}
          value={selectedSubcategories[0] || ''}
          onChange={handleSubcategoryChange}
        />
        {isContinueButtonDisabled && (
            <p className={styles.error}>Сначала выберите категорию</p>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <GreenBorderButton className={styles.back_button} onClick={handleBack} type="submit">{buttonPrevText}</GreenBorderButton>
        <GreenButton className={styles.confirm_button} onClick={handleNext} type="submit">{buttonNextText}</GreenButton>
      </div>
    </form>
  );
});
