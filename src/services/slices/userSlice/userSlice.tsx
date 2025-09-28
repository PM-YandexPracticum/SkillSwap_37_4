import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from './type';
import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi } from './userApi';

type UserProfile = {
  user: TUser | null;
  isAuthChecked: boolean; // проверили ли авторизацию (например, при старте приложения)
  loading: boolean;
  error: string | null;
};


export const mockUser: TUser = {
  id: 1,
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  password: '123456',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
  birthday: new Date('1995-05-15'),
  aboutMe: 'Люблю программировать и кататься на велосипеде 🚴‍♂️',
  city: 'Алматы',
  gender: 'male',
  wantLearn: [
    { name: 'Тайм менеджмент' },
    { name: 'Медитация' },
    { name: 'Английский язык' }
  ],
  canLearn: [
    { name: 'Игра на барабанах' },
    { name: 'React JS' },
    { name: 'Node.js' }
  ]
};

export const userInitialState: UserProfile = {
  user: mockUser,
  error: '',
  loading: false,
  isAuthChecked: false
};

// ============================
// Async thunks
// ============================
export const checkUserAuthThunk = createAsyncThunk(
  'user/checkUserAuth',
  async () => {
    const data = await getUserApi();
    return data.user;
  }
);

export const userLoginThunk = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const { accessToken, refreshToken, user } = await loginUserApi(data);

    // для реального API тут бы сохранили токены
    document.cookie = `accessToken=${accessToken}`;
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const userRegisterThunk = createAsyncThunk(
  'user/register',
  async (data: Partial<TUser>) => {
    const { accessToken, refreshToken, user } = await registerUserApi(data);

    document.cookie = `accessToken=${accessToken}`;
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (data: Partial<TUser>) => {
    const { user } = await updateUserApi(data);
    return user;
  }
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  document.cookie = 'accessToken=; Max-Age=0';
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetErrors(state) {
      state.error = '';
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    errorSelector: (state) => state.error,
    userSelector: (state) => state.user,
    isAuthSelector: (state) => state.isAuthChecked,
    userLoadingSelector: (state) => state.loading
  }, 
  extraReducers: (builder) => {
     builder
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(checkUserAuthThunk.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.error = action.error.message || 'Ошибка проверки авторизации';
      });

    // --- userLoginThunk
    builder
      .addCase(userLoginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка входа';
      });

    // --- userRegisterThunk
    builder
      .addCase(userRegisterThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegisterThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(userRegisterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      });

    // --- updateUserThunk
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      });

    // --- logoutUserThunk
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthChecked = false;
    });
  }
});

export const {
  errorSelector,
  userSelector,
  isAuthSelector,
  userLoadingSelector
} = userSlice.selectors;
export const { resetErrors, setUser } = userSlice.actions;
export default userSlice.reducer;
