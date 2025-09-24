// server/src/types/user.ts
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  birthday: string | null;
  description: string | null;
  city: string | null;
  gender: string | null;
  wantLearn: string | null;
}

export interface CreateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  birthday?: string;
  description?: string;
  city?: string;
  gender?: string;
  wantLearn?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  birthday?: string;
  description?: string;
  city?: string;
  gender?: string;
  wantLearn?: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  user: User;
  message: string;
}