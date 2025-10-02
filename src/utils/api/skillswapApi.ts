import { TSkillTag } from '../../components/cardTag/CardTag';
import { TUser } from '../../types/user';

const URL = process.env.SKILSWAP_API_URL || 'http://localhost:5000';

export type TPureUserItem = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  description: string;
  city: string;
  age: string;
  gender: string;
};

export type TUserItem = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  description: string;
  city: string;
  age: string;
  gender: string;
  canTeach: string[];
  wantLearn: string[];
};

export enum ENotifyStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}
export type TNotifyHistoryItem = {
  id: string;
  skillId: string; //нужен ли
  fromUser: string;
  toUser: string;
  notifyDate: Date;
  status: ENotifyStatus;
};
export type TSkillItem = {
  id: string;
  ownerId: string;
  createDate: string;
  description: string;
  userName: string;
  city: string;
  age: string;
  avatar_url: string;
  likes: string[];
  requested: string[];
};

export type TCard = {
  skillId: string;
  createDate: string;
  userName: string;
  city: string;
  age: string;
  avatar_url: string;
  liked: boolean;
  onRequest: boolean;
  // canTeach: TSkillTag[];
  // wantLearn: TSkillTag[];
};

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TUserResponse = TServerResponse<{
  data: TUserItem[];
}>;
type TPureUserResponse = TServerResponse<{
  data: TPureUserItem[];
}>;
type TLoginResponse = TServerResponse<{
  user: TPureUserItem;
  message: string;
}>;

type TNotifyResponse = TServerResponse<{
  data: TNotifyHistoryItem[];
}>;

type TSortObject = {
  city?: string[];
  gender?: string;
  skills?: string[];
  sortByNewest?: boolean;
  sortByPopular?: boolean;
  canTeach?: boolean;
  wantLearn?: boolean;
};

export type TLoginData = {
  email: string;
  password: string;
};

export const getUserApi = (number: string) =>
  fetch(`${URL}/api/users/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TPureUserResponse>(res));

export const loginUserApi = (
  email: string,
  password: string
): Promise<TLoginResponse> => {
  const loginData: TLoginData = {
    email: email,
    password: password
  };

  return fetch(`${URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then((res) => {
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      return checkResponse<TLoginResponse>(res);
    })
    .then((data) => {
      console.log('Parsed data:', data);
      if (data?.success) {
        return data;
      }
      return Promise.reject(data);
    })
    .catch((error) => {
      console.error('Login error:', error);
      throw error;
    });
};
