export const SKILL_CATEGORY = {
  'Бизнес и карьера': [
    'Управление командой',
    'Маркетинг и реклама',
    'Продажи и переговоры',
    'Личный бренд',
    'Резюме и собеседование',
    'Тайм-менеджмент',
    'Проектное управление',
    'Предпринимательство',
  ],
  'Творчество и искусство': [
    'Рисование и иллюстрация',
    'Фотография',
    'Видеомонтаж',
    'Музыка и звук',
    'Актёрское мастерство',
    'Креативное письмо',
    'Арт-терапия',
    'Декор и DIY',
  ],
  'Иностранные языки': [
    'Английский',
    'Французский',
    'Испанский',
    'Немецкий',
    'Китайский',
    'Японский',
    'Подготовка к экзаменам (IELTS, TOEFL)',
  ],
  'Образование и развитие': [
    'Личностное развитие',
    'Навыки обучения',
    'Когнитивные техники',
    'Скорочтение',
    'Навыки преподавания',
    'Коучинг',
  ],
  'Дом и уют': [
    'Уборка и организация',
    'Домашние финансы',
    'Приготовление еды',
    'Домашние растения',
    'Ремонт',
    'Хранение вещей',
  ],
  'Здоровье и лайфстайл': [
    'Йога и медитация',
    'Питание и ЗОЖ',
    'Ментальное здоровье',
    'Осознанность',
    'Физические тренировки',
    'Сон и восстановление',
    'Баланс жизни и работы',
  ],
} as const;

export const SKILL_VALUE: Record<keyof typeof SKILL_CATEGORY, { color: string; icon: string }> =
  {
    'Бизнес и карьера': {
      color: '#EEE7F7',
      icon: '/src/components/app/assets/static/iconsSkillsCategory/briefcase.svg',
    },
    'Дом и уют': {
      color: '#F7EBE5',
      icon: '/src/components/app/assets/static/iconsSkillsCategory/home.svg',
    },
    'Здоровье и лайфстайл': {
      color: '#E9F7E7',
      icon: '/src/components/app/assets/static/iconsSkillsCategory/lifestyle.svg',
    },
    'Иностранные языки': {
      color: '#EBE5C5',
      icon: '/src/components/app/assets/static/iconsSkillsCategory/global.svg',
    },
    'Образование и развитие': {
      color: '#E7F2F6',
      icon: '/src/components/app/assets/static/iconsSkillsCategory/book.svg',
    },
    'Творчество и искусство': {
      color: '#F7E7F2',
      icon: '/src/components/app/assets/static/iconsSkillsCategory/palette.svg',
    },
  };
