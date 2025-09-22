import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TSkill, CreateSkillRequest } from '../../types/skill';


interface SkillState {
  skills: TSkill[];
  currentSkill: TSkill | null;
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: [],
  currentSkill: null,
  loading: false,
  error: null
};

export const getSkillCardById = createAsyncThunk(
  'skill/getSkillCardById',
  async (id: string): Promise<TSkill> => {
    // TODO: Заменить на реальный API вызов
    throw new Error('API не реализован');
  }
);

export const createSkill = createAsyncThunk(
  'skill/createSkill',
  async (skillData: CreateSkillRequest): Promise<TSkill> => {
    // TODO: Заменить на реальный API вызов
    throw new Error('API не реализован');
  }
);

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    clearCurrentSkill: (state) => {
      state.currentSkill = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // getSkillCardById
      .addCase(getSkillCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkillCardById.fulfilled, (state, action: PayloadAction<TSkill>) => {
        state.loading = false;
        state.currentSkill = action.payload;
        state.error = null;
      })
      .addCase(getSkillCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке навыка';
        state.currentSkill = null;
      })
      
      // createSkill
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action: PayloadAction<TSkill>) => {
        state.loading = false;
        state.skills.push(action.payload);
        state.error = null;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании навыка';
      });
  }
});

export const { clearCurrentSkill, clearError } = skillSlice.actions;
export default skillSlice.reducer;
