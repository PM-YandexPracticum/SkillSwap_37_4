import briefcaseIcon from '../components/app/assets/static/iconsSkillsCategory/briefcase.svg';
import homeIcon from '../components/app/assets/static/iconsSkillsCategory/home.svg';
import lifestyleIcon from '../components/app/assets/static/iconsSkillsCategory/lifestyle.svg';
import globalIcon from '../components/app/assets/static/iconsSkillsCategory/global.svg';
import bookIcon from '../components/app/assets/static/iconsSkillsCategory/book.svg';
import paletteIcon from '../components/app/assets/static/iconsSkillsCategory/palette.svg';

// Простой интерфейс для работы со списком категорий в фильтрах
export interface SkillCategory {
  categoryName: string;
  subcategoryName: string[];
}

export const SKILL_CATEGORY: SkillCategory[] = [
  {
    categoryName: 'Бизнес и карьера',
    subcategoryName: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство'
    ]
  },
  {
    categoryName: 'Творчество и искусство',
    subcategoryName: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY'
    ]
  },
  {
    categoryName: 'Иностранные языки',
    subcategoryName: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)'
    ]
  },
  {
    categoryName: 'Образование и развитие',
    subcategoryName: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг'
    ]
  },
  {
    categoryName: 'Дом и уют',
    subcategoryName: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей'
    ]
  },
  {
    categoryName: 'Здоровье и лайфстайл',
    subcategoryName: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы'
    ]
  }
];

export const CITY_CATEGORY: SkillCategory[] = [
  {
    categoryName: 'Москва',
    subcategoryName: []
  },
  {
    categoryName: 'Санкт-Петербург',
    subcategoryName: []
  },
  {
    categoryName: 'Новосибирск',
    subcategoryName: []
  },
  {
    categoryName: 'Екатеринбург',
    subcategoryName: []
  },
  {
    categoryName: 'Казань',
    subcategoryName: []
  }
];

// Простая функция для получения цвета и иконки по названию категории
export function getSkillValue(categoryName: string) {
  const values: Record<string, { color: string; icon: string }> = {
    'Бизнес и карьера': {
      color: '#EEE7F7',
      icon: briefcaseIcon
    },
    'Дом и уют': {
      color: '#F7EBE5',
      icon: homeIcon
    },
    'Здоровье и лайфстайл': {
      color: '#E9F7E7',
      icon: lifestyleIcon
    },
    'Иностранные языки': {
      color: '#EBE5C5',
      icon: globalIcon
    },
    'Образование и развитие': {
      color: '#E7F2F6',
      icon: bookIcon
    },
    'Творчество и искусство': {
      color: '#F7E7F2',
      icon: paletteIcon
    }
  };

  return values[categoryName] || { color: '#F0F0F0', icon: '' };
}
