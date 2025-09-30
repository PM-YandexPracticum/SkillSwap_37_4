import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  CategoryType,
  SubcategoryType,
  GenderType
} from '../../services/slices/registerSlice';

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

export const RegisterStepSecondForm = memo(
  ({ buttonPrevText, buttonNextText }: RegisterStepSecondFormProps) => {
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
      subcategory: []
    });

    useEffect(
      () => () => {
        dispatch(resetRegisterData());
      },
      [dispatch]
    );

    const [selectedCategories, setSelectedCategories] = useState<string | ''>(
      ''
    );
    const [selectedSubcategories, setSelectedSubcategories] = useState<
      string[]
    >([]);
    const getSubcategories = (): string[] => {
      if (!selectedCategories) return [];
      const categoryData = SKILL_CATEGORY.find(
        (item) => item.categoryName === selectedCategories
      );
      return categoryData?.subcategoryName || [];
    };
    const [date, setDate] = useState<Date | null>(null);

    // Модифицируем получение опций для DropDown
    const categoryOptions: DropDownOption[] = SKILL_CATEGORY.map((item) => ({
      value: item.categoryName,
      label: item.categoryName
    }));

    // Аналогично для подкатегорий
    const subcategoryOptions: DropDownOption[] = getSubcategories().map(
      (subcategory) => ({
        value: subcategory,
        label: subcategory
      })
    );

    useEffect(
      () => () => {
        dispatch(resetRegisterData());
      },
      [dispatch]
    );

    useEffect(() => {
      setFormData({
        ...formData,
        ...{
          avatar: registerData.avatar || '',
          name: registerData.name || '',
          dateOfBirth: registerData.dateOfBirth || '',
          gender: registerData.gender || 'Не указан',
          city: registerData.city || ''
        }
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
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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
      <div className={styles.page_container}>
        <form className={styles.form_container}>
          <div className={styles.icon__container}>
            <label htmlFor='avatar' className={styles.avatar__label}>
              <img className={styles.avatar__label_plusIcon} src={iconPlus} />
            </label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              className={styles.avatar__input}
              multiple={false}
              onChange={handleFileChange}
              aria-label='Загрузить аватар'
            />
            {formData.avatar && (
              <img
                src={typeof formData.avatar === 'string' ? formData.avatar : ''}
                alt='Аватар пользователя'
              />
            )}
          </div>

          <Input
            label='Имя'
            value={formData.name}
            placeholder='Введите ваше имя'
            onChange={handleChange}
            className={styles.element__input}
          />
          <div className={styles.input__drops_container}>
            <div className={styles.input__drops_birthday}>
              <DatePickerComponent
                selectedDate={date}
                setSelectedDate={setDate}
              />
            </div>

            <DropDown
              options={genderData}
              /*onChange={handleChange}*/
              placeholder='Не указан'
              className={styles.input__drops_gender}
            />
          </div>
          <DropDown
            options={townsData}
            /*onChange={handleChange}*/
            placeholder='Не указан'
            className={styles.input__drops_town}
          />
          <DropDown
            placeholder='Выберите категорию'
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleCategoryChange}
            className={styles.input__drops_town}
          />
          <DropDown
            placeholder='Выберите подкатегорию'
            options={subcategoryOptions}
            value={selectedSubcategories[0] || ''}
            onChange={handleSubcategoryChange}
            className={styles.input__drops_town}
          />
          {isContinueButtonDisabled && (
            <p className={styles.error}>Сначала выберите категорию</p>
          )}
          <div className={styles.button__group}>
            <GreenBorderButton
              className={styles.button_width}
              onClick={handleBack}
              type='submit'
            >
              {buttonPrevText}
            </GreenBorderButton>
            <GreenButton
              className={styles.button_width}
              onClick={handleNext}
              type='submit'
            >
              {buttonNextText}
            </GreenButton>
          </div>
        </form>
      </div>
    );
  }
);
