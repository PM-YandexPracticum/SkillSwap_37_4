import briefcaseIcon from '../components/app/assets/static/iconsSkillsCategory/briefcase.svg';
import homeIcon from '../components/app/assets/static/iconsSkillsCategory/home.svg';
import lifestyleIcon from '../components/app/assets/static/iconsSkillsCategory/lifestyle.svg';
import globalIcon from '../components/app/assets/static/iconsSkillsCategory/global.svg';
import bookIcon from '../components/app/assets/static/iconsSkillsCategory/book.svg';
import paletteIcon from '../components/app/assets/static/iconsSkillsCategory/palette.svg';

export const SKILL_CATEGORY = {
  'Бизнес и карьера': [
    'Управление командой',
    'Маркетинг и реклама',
    'Продажи и переговоры',
    'Личный бренд',
    'Резюме и собеседование',
    'Тайм-менеджмент',
    'Проектное управление',
    'Предпринимательство'
  ],
  'Творчество и искусство': [
    'Рисование и иллюстрация',
    'Фотография',
    'Видеомонтаж',
    'Музыка и звук',
    'Актёрское мастерство',
    'Креативное письмо',
    'Арт-терапия',
    'Декор и DIY'
  ],
  'Иностранные языки': [
    'Английский',
    'Французский',
    'Испанский',
    'Немецкий',
    'Китайский',
    'Японский',
    'Подготовка к экзаменам (IELTS, TOEFL)'
  ],
  'Образование и развитие': [
    'Личностное развитие',
    'Навыки обучения',
    'Когнитивные техники',
    'Скорочтение',
    'Навыки преподавания',
    'Коучинг'
  ],
  'Дом и уют': [
    'Уборка и организация',
    'Домашние финансы',
    'Приготовление еды',
    'Домашние растения',
    'Ремонт',
    'Хранение вещей'
  ],
  'Здоровье и лайфстайл': [
    'Йога и медитация',
    'Питание и ЗОЖ',
    'Ментальное здоровье',
    'Осознанность',
    'Физические тренировки',
    'Сон и восстановление',
    'Баланс жизни и работы'
  ]
} as const;

export const SKILL_VALUE: Record<
  keyof typeof SKILL_CATEGORY,
  { color: string; icon: string }
> = {
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
