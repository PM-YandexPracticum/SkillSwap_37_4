import { DropDown } from '../DropDown';
import { Input } from '../input/Input';
import styles from './SkillForm.module.css';
import { SKILL_CATEGORY } from '../../const/skillsCategoryMapping';
import { useRef, useState } from 'react';
import DropzoneIconCategory from '../ui/dropzone/DropzoneIconCategory';
import GreenBorderButton from '../buttons/GreenBorderButton';
import GreenButton from '../buttons/GreenButton';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

export interface ConstatsType {
  name_item_text: string;
  name_item_input: string;

  category_item_text: string;
  category_item_input: string;

  subcategory_item_text: string;
  subcategory_item_input: string;

  description_item_text: string;
  description_item_input: string;

  image_item_text: string;
  image_item_input: string;

  close_item_button: string;
  continue_item_button: string;
}

// const CONSTATS: ConstatsType = {
//   name_item_text: 'Название навыка',
//   name_item_input: 'Введите название вашего навыка',

//   category_item_text: 'Категория навыка',
//   category_item_input: 'Выберите категорию навыка',

//   subcategory_item_text: 'Подкатегория навыка',
//   subcategory_item_input: 'Выберите подкатегорию навыка',

//   description_item_text: 'Описание',
//   description_item_input: 'Коротко опишите, чему можете научить',

//   image_item_text: 'Перетащите или выберите изображения навыка',
//   image_item_input: 'Выбрать изображения',

//   close_item_button: 'Назад',
//   continue_item_button: 'Продолжить'
// };

export const SkillForm = (CONSTATS: ConstatsType) => {
  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof SKILL_CATEGORY | ''
  >('');
  let navigate = useNavigate();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // refs для инпутов
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (nameRef.current && !nameRef.current.checkValidity()) {
      newErrors.name = nameRef.current.validationMessage;
    }
    if (!selectedCategory) {
      newErrors.category = 'Пожалуйста, выберите категорию.';
    }
    if (!selectedSubcategory) {
      newErrors.subcategory = 'Пожалуйста, выберите подкатегорию.';
    }
    if (descRef.current && !descRef.current.checkValidity()) {
      newErrors.desc = descRef.current.validationMessage;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // submit
    }
  };

  const returnBack = () => {
    setSelectedSubcategory('');
    setSelectedCategory('');
    navigate(-1);
  };

  const categoryOptions = Object.keys(SKILL_CATEGORY).map((cat) => ({
    value: cat,
    label: cat
  }));

  const subcategoryOptions =
    selectedCategory && selectedCategory in SKILL_CATEGORY
      ? (
          SKILL_CATEGORY[
            selectedCategory as keyof typeof SKILL_CATEGORY
          ] as readonly string[]
        ).map((sub) => ({
          value: sub,
          label: sub
        }))
      : [];

  return (
    <form className={styles.skill_form} noValidate onSubmit={handleSubmit}>
      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>{CONSTATS.name_item_text}</p>
        <Input
          ref={nameRef}
          inputContainer={styles.skill_form_item_input_container}
          className={
            errors.name ? styles.input_error : styles.skill_form_item_input
          }
          placeholder={CONSTATS.name_item_input}
          maxLength={50}
          minLength={3}
          required
          onBlur={() => {
            if (nameRef.current)
              setErrors((prev) => ({
                ...prev,
                name: nameRef.current!.validationMessage
              }));
          }}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>
          {CONSTATS.category_item_text}
        </p>
        <DropDown
          placeholder={CONSTATS.category_item_input}
          options={categoryOptions}
          value={selectedCategory}
          onChange={(val) => {
            setSelectedCategory(val as keyof typeof SKILL_CATEGORY | '');
            setSelectedSubcategory('');
            setErrors((prev) => ({ ...prev, category: '' }));
          }}
          className={errors.category ? styles.drop_down_error : ''}
        />
        {errors.category && (
          <span className={styles.errorText}>{errors.category}</span>
        )}
      </div>

      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>
          {CONSTATS.subcategory_item_text}
        </p>
        <DropDown
          options={subcategoryOptions}
          value={selectedSubcategory}
          placeholder={CONSTATS.subcategory_item_input}
          onChange={(val) => {
            setSelectedSubcategory(val);
            setErrors((prev) => ({ ...prev, subcategory: '' }));
          }}
          disabled={!selectedCategory}
          className={errors.subcategory ? styles.drop_down_error : ''}
        />
        {errors.subcategory && (
          <span className={styles.errorText}>{errors.subcategory}</span>
        )}
      </div>

      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>
          {CONSTATS.description_item_text}
        </p>
        <Input
          ref={descRef}
          inputContainer={styles.skill_form_item_input_container}
          className={
            errors.desc ? styles.input_error : styles.skill_form_item_input
          }
          placeholder={CONSTATS.description_item_input}
          maxLength={500}
          required
          onBlur={() => {
            if (descRef.current)
              setErrors((prev) => ({
                ...prev,
                desc: descRef.current!.validationMessage
              }));
          }}
        />
        {errors.desc && <span className={styles.errorText}>{errors.desc}</span>}
      </div>

      {/* DropzoneIconCategory и кнопки без изменений */}
      <DropzoneIconCategory
        className={styles.skill_form_item}
        onFilesSelected={() => {}}
        placeholder={CONSTATS.image_item_text}
        buttonText={CONSTATS.image_item_input}
      />

      <div className={clsx(styles.skill_form_item, styles.skill_form_button)}>
        <GreenBorderButton
          className={styles.button}
          type='reset'
          onClick={returnBack}
        >
          <span>{CONSTATS.close_item_button}</span>
        </GreenBorderButton>
        <GreenButton className={styles.button} type='submit'>
          <span>{CONSTATS.continue_item_button}</span>
        </GreenButton>
      </div>
    </form>
  );
};
