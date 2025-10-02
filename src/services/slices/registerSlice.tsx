import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../services/store/store';

export type CategoryType = string[];
export type SubcategoryType = string[];
export type GenderType = 'Мужской' | 'Женский' | 'Не указан';

interface RegisterState {
  avatar: string;
  name: string;
  dateOfBirth: string;
  gender: GenderType;
  city: string;
  categorySkillToLearn: string;
  subcategorySkillToLearn: string;
  categories: CategoryType;
  subcategories: SubcategoryType;
}

// Начальное состояние с улучшенными значениями
const initialState: RegisterState = {
  avatar: '',
  name: '',
  dateOfBirth: '',
  gender: 'Не указан',
  city: '',
  categorySkillToLearn: '',
  subcategorySkillToLearn: '',
  categories: [],
  subcategories: []
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    // Основное действие для обновления данных
    setRegisterData: (state, action: PayloadAction<Partial<RegisterState>>) =>
      // Используем spread оператор для иммутабельности
      ({
        ...state,
        ...action.payload
      }),
    // Действие для сброса данных
    resetRegisterData: () => initialState
  }
  // Добавляем дополнительные действия через extraReducers если нужно
});

// Оптимизируем селекторы через createSelector (если используется reselect)
export const selectRegisterState = (state: RootState) => state.register;

export const {
  avatar: selectAvatar,
  name: selectName,
  dateOfBirth: selectDateOfBirth,
  gender: selectGender,
  city: selectCity,
  categorySkillToLearn,
  subcategorySkillToLearn,
  categories: selectCategories,
  subcategories: selectSubcategories
} = selectRegisterState as any;

// Экспортируем действия
export const { setRegisterData, resetRegisterData } = registerSlice.actions;

export default registerSlice.reducer;
