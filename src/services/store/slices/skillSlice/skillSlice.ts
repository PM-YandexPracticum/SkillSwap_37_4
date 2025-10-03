import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  TSkill,
  CreateSkillRequest,
  UpdateSkillRequest
} from '../../../../types/skill';
import {
  createSkillApi,
  deleteSkillApi,
  getSkillByIdApi,
  getSkillPageByIdApi,
  getSkillsByOwnerApi,
  TSkillPage,
  updateSkillApi
} from './skillApi';

export interface SkillState {
  skills: TSkill[];
  currentSkill: TSkill | null;
  loading: boolean;
  error: string | null;
}

export const initialState: SkillState = {
  skills: [],
  currentSkill: null,
  loading: false,
  error: null
};

export const getSkillCardById = createAsyncThunk(
  'skill/getSkillCardById',
  async (id: string): Promise<TSkill> => {
    const data = await getSkillByIdApi(id);
    return data;
  }
);

export const getSkillPageById = createAsyncThunk(
  'skill/getSkillCardById',
  async (id: string): Promise<TSkillPage> => {
    const page = await getSkillPageByIdApi(id);
    return page;
  }
);

export const createSkill = createAsyncThunk(
  'skill/createSkill',
  async (skillData: CreateSkillRequest): Promise<TSkill> => {
    const newSkill = await createSkillApi(skillData);
    return newSkill;
  }
);

export const updateSkill = createAsyncThunk(
  'skill/updateSkill',
  async ({
    id,
    skill
  }: {
    id: string;
    skill: UpdateSkillRequest;
  }): Promise<TSkill> => {
    const updatedSkill = await updateSkillApi(id, skill);
    return updatedSkill;
  }
);

export const getSkillsByUserId = createAsyncThunk(
  'skill/getSkillsByUserId',
  async (userId: string): Promise<TSkill[]> => {
    const userSkills = await getSkillsByOwnerApi(userId);
    return userSkills;
  }
);

export const deleteSkillById = createAsyncThunk(
  'skill/deleteSkillById',
  async (skillId: string): Promise<string> => {
    const deletedSkill = await deleteSkillApi(skillId);
    return deletedSkill;
  }
);

export const skillSlice = createSlice({
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
      .addCase(
        getSkillCardById.fulfilled,
        (state, action: PayloadAction<TSkill>) => {
          state.loading = false;
          state.currentSkill = action.payload;
          state.error = null;
        }
      )
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
      .addCase(
        createSkill.fulfilled,
        (state, action: PayloadAction<TSkill>) => {
          state.loading = false;
          state.skills.push(action.payload);
          state.error = null;
        }
      )
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании навыка';
      })

      // updateSkill
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSkill.fulfilled,
        (state, action: PayloadAction<TSkill>) => {
          state.loading = false;
          const index = state.skills.findIndex(
            (skill) => skill.id === action.payload.id
          );
          if (index !== -1) {
            state.skills[index] = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при обновлении навыка';
      })

      // getSkillsByUserId
      .addCase(getSkillsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSkillsByUserId.fulfilled,
        (state, action: PayloadAction<TSkill[]>) => {
          state.loading = false;
          state.skills = action.payload;
          state.error = null;
        }
      )
      .addCase(getSkillsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке навыков пользователя';
      })

      /// deleteSkillById
      .addCase(deleteSkillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSkillById.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.skills = state.skills.filter(
            (skill) => skill.id !== action.payload
          );
          state.error = null;
        }
      )
      .addCase(deleteSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при удалении скилла';
      });
  }
});

export const { clearCurrentSkill, clearError } = skillSlice.actions;
export default skillSlice.reducer;
