import { TUser } from './type';
import { mockUser } from './userSlice';

// эмуляция задержки запроса
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Проверка аутентификации (checkUserAuth)
 */
export const getUserApi = async (): Promise<{ user: TUser }> => {
  await sleep(500);
  return { user: mockUser };
};

/**
 * Логин пользователя
 */
export const loginUserApi = async (data: { email: string; password: string }): Promise<{ user: TUser; accessToken: string; refreshToken: string }> => {
  await sleep(500);
  // пока всегда возвращаем мокнутого пользователя
  if (data.email === mockUser.email && data.password === mockUser.password) {
    return {
      user: mockUser,
      accessToken: 'mockAccessToken123',
      refreshToken: 'mockRefreshToken123'
    };
  }
  throw new Error('Неверный логин или пароль');
};

/**
 * Регистрация нового пользователя
 */
export const registerUserApi = async (data: Partial<TUser>): Promise<{ user: TUser; accessToken: string; refreshToken: string }> => {
  await sleep(500);
  // возвращаем копию mockUser с новыми полями
  const newUser: TUser = {
    ...mockUser,
    ...data,
    id: Date.now() // якобы id с бэка
  };
  return {
    user: newUser,
    accessToken: 'mockAccessTokenNew123',
    refreshToken: 'mockRefreshTokenNew123'
  };
};

/**
 * Обновление профиля (пароль, почта, город и т.д.)
 */
export const updateUserApi = async (data: Partial<TUser>): Promise<{ user: TUser }> => {
  await sleep(500);
  const updatedUser: TUser = { ...mockUser, ...data };
  return { user: updatedUser };
};

/**
 * Логаут
 */
export const logoutApi = async (): Promise<void> => {
  await sleep(300);
  return;
};
