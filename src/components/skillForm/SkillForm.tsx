import { DropDown } from '../DropDown';
import { Input } from '../input/Input';
import styles from './SkillForm.module.css';
import { SKILL_CATEGORY } from '../../const/skillsCategoryMapping';
import { useState } from 'react';
import DropzoneIconCategory from '../ui/dropzone/DropzoneIconCategory';
import GreenBorderButton from '../buttons/GreenBorderButton';
import GreenButton from '../buttons/GreenButton';

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

const CONSTATS: ConstatsType = {
  name_item_text: 'Название навыка',
  name_item_input: 'Введите название вашего навыка',

  category_item_text: 'Категория навыка',
  category_item_input: 'Выберите категорию навыка',

  subcategory_item_text: 'Подкатегория навыка',
  subcategory_item_input: 'Выберите подкатегорию навыка',

  description_item_text: 'Описание',
  description_item_input: 'Коротко опишите, чему можете научить',

  image_item_text: 'Перетащите или выберите изображения навыка',
  image_item_input: 'Выбрать изображения',

  close_item_button: 'Назад',
  continue_item_button: 'Продолжить'
};

export const SkillForm = (CONSTATS: ConstatsType) => {
  const [selectedCategory, setSelectedCategory] = useState<
    keyof typeof SKILL_CATEGORY | ''
  >('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const onFilesSelected = () => {};

  // Формируем опции для DropDown
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
    <form className={styles.skill_form}>
      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>{CONSTATS.name_item_text}</p>
        <Input
          inputContainer={styles.skill_form_item_input_container}
          className={styles.skill_form_item_input}
          placeholder={CONSTATS.name_item_input}
        ></Input>
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
            setSelectedSubcategory(''); // сбрасываем подкатегорию при смене категории
          }}
        />
      </div>

      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>
          {CONSTATS.subcategory_item_text}
        </p>
        <DropDown
          options={subcategoryOptions}
          value={selectedSubcategory}
          placeholder={CONSTATS.subcategory_item_input}
          onChange={setSelectedSubcategory}
          disabled={!selectedCategory}
        />
      </div>

      <div className={styles.skill_form_item}>
        <p className={styles.skill_form_item_text}>
          {CONSTATS.description_item_text}
        </p>
        <Input
          inputContainer={styles.skill_form_item_input_container}
          className={styles.skill_form_item_input}
          placeholder={CONSTATS.description_item_input}
        ></Input>
      </div>

      <DropzoneIconCategory
        className={styles.skill_form_item}
        onFilesSelected={onFilesSelected}
        placeholder={CONSTATS.image_item_text}
        buttonText={CONSTATS.image_item_input}
      />

      <div className={styles.skill_form_item }>
        <GreenBorderButton disabled={false} className='' type='button'><span></span></GreenBorderButton>
        <GreenButton disabled={false} className='' type='submit'><span></span></GreenButton>
      </div>
    </form>
  );
};
