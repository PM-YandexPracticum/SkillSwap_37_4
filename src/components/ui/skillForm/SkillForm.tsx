
import styles from './SkillForm.module.css';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILL_CATEGORY } from '../../../const/skillsCategoryMapping';
import GreenBorderButton from '../../buttons/GreenBorderButton';
import GreenButton from '../../buttons/GreenButton';
import DropDown from '../../DropDown';
import { Input } from '../../input/Input';
import DropzoneIconCategory from '../dropzone/DropzoneIconCategory';
import { TSTEP_THREE_FORM_LABELS } from '../../../const/constLag';
interface SkillFormProps {
  languageConst: TSTEP_THREE_FORM_LABELS;
}

export const SkillForm: React.FC<SkillFormProps> = ({ languageConst }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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

  const categoryOptions = SKILL_CATEGORY.map((cat) => ({
    value: cat.categoryName,
    label: cat.categoryName
  }));

  const subcategoryOptions =
    selectedCategory
      ? (
          SKILL_CATEGORY.find((cat) => cat.categoryName === selectedCategory)?.subcategoryName || []
        ).map((sub) => ({
          value: sub,
          label: sub
        }))
      : [];

  return (
    <form className={styles.skill_form} noValidate onSubmit={handleSubmit}>
      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>{languageConst.name_item_text}</p>
        <Input
          ref={nameRef}
          fields__container={styles.skill_form_item_input_container}
          className={
            errors.name ? styles.input_error : styles.skill_form_item_input
          }
          placeholder={languageConst.name_item_input}
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
          {languageConst.category_item_text}
        </p>
        <DropDown
          placeholder={languageConst.category_item_input}
          options={categoryOptions}
          value={selectedCategory || undefined}
          onChange={(val) => {
            setSelectedCategory(val);
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
          {languageConst.subcategory_item_text}
        </p>
        <DropDown
          options={subcategoryOptions}
          value={selectedSubcategory}
          placeholder={languageConst.subcategory_item_input}
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
          {languageConst.description_item_text}
        </p>
        <Input
          ref={descRef}
          fields__container={styles.skill_form_item_input_container}
          className={
            errors.desc ? styles.input_error : styles.skill_form_item_input
          }
          placeholder={languageConst.description_item_input}
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
        placeholder={languageConst.image_item_text}
        buttonText={languageConst.image_item_input}
      />

      <div className={clsx(styles.skill_form_item, styles.skill_form_button)}>
        <GreenBorderButton
          className={styles.button}
          type='reset'
          onClick={returnBack}
        >
          <span>{languageConst.close_item_button}</span>
        </GreenBorderButton>
        <GreenButton className={styles.button} type='submit'>
          <span>{languageConst.continue_item_button}</span>
        </GreenButton>
      </div>
    </form>
  );
};
