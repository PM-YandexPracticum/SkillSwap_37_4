import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../services/store/store';

// Определяем типы для категорий и подкатегорий
export type CategoryType = string[];
export type SubcategoryType = string[];

// Улучшенный интерфейс состояния
interface RegisterState {
  avatar: string;
  name: string;
  dateOfBirth: string;
  gender: GenderType;
  city: string;
  categories: CategoryType;
  subcategories: SubcategoryType;
}

// Тип для пола
export type GenderType = 'Мужской' | 'Женский' | 'Не указан';

// Начальное состояние с улучшенными значениями
const initialState: RegisterState = {
  avatar: '',
  name: '',
  dateOfBirth: '',
  gender: 'Не указан',
  city: '',
  categories: [],
  subcategories: [],
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    // Действие для установки данных регистрации
    setRegisterData: (
      state,
      action: PayloadAction<Partial<RegisterState>>
    ) => {
      // Используем spread оператор для иммутабельности
      return {
        ...state,
        ...action.payload,
      };
    },
    // Действие для сброса данных
    resetRegisterData: () => initialState,
    // Дополнительное действие для установки аватарки
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    // Дополнительное действие для установки имени
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Дополнительное действие для установки даты рождения
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    // Дополнительное действие для установки города
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    // Дополнительное действие для установки категорий
    setCategories: (state, action: PayloadAction<CategoryType>) => {
      state.categories = action.payload;
    },
    // Дополнительное действие для установки подкатегорий
    setSubcategories: (state, action: PayloadAction<SubcategoryType>) => {
      state.subcategories = action.payload;
    },
  },
});

// Экспорт селекторов
export const selectRegisterState = (state: RootState) => state.register;
export const selectAvatar = (state: RootState) => state.register.avatar;
export const selectName = (state: RootState) => state.register.name;
export const selectDateOfBirth = (state: RootState) => state.register.dateOfBirth;
export const selectGender = (state: RootState) => state.register.gender;
export const selectCity = (state: RootState) => state.register.city;
export const selectCategories = (state: RootState) => state.register.categories;
export const selectSubcategories = (state: RootState) => state.register.subcategories;

// Экспорт действий и редьюсера
export const {
  setRegisterData,
  resetRegisterData,
  setAvatar,
  setName,
  setDateOfBirth,
  setCity,
  setCategories,
  setSubcategories,
} = registerSlice.actions;

export default registerSlice.reducer;
