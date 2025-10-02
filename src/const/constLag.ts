export interface TSTEP_THREE_FORM_LABELS {
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

export const STEP_THREE_FORM_LABELS: TSTEP_THREE_FORM_LABELS = {
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
