import { TSkillTag } from "../../components/cardTag/CardTag";

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
  canTeach: TSkillTag[];
  wantLearn: TSkillTag[];
}

export enum ENotifyStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}
export type TNotifyHistoryItem = {
  id: string;
  skillId: string;//нужен ли
  fromUser: string;
  toUser: string;
  notifyDate: Date;
  status: ENotifyStatus;
}
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
}

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
}

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TUserResponse = TServerResponse<{
  data: TUserItem[];
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

// export const getCardApi = async (skillId: string): Promise<TCard> => {
// }

// export const getCardsApi = async (from:  number, to: number, sortObject: TSortObject): Promise<TCard[]> => {
//   try {
//     const [cardsResponse, usersResponse] = await Promise.all([
//       fetch(`${URL}/cards.json`),
//       fetch(`${URL}/users.json`)
//     ]);

//     const cardsData = await checkResponse<{ data: TSkillItem[] }>(cardsResponse);
//     const usersData = await checkResponse<{ data: TUserItem[] }>(usersResponse);

//     if (!cardsData?.data || !usersData?.data) {
//       throw new Error('Invalid data format');
//     }

//     // Создаем карту пользователей для быстрого поиска по ID
//     const usersMap = new Map(
//       usersData.data.map(user => [user.id, user])
//     );

//     // Объединяем данные
//     const mergedCards: TCard[] = cardsData.data.map(skillItem => {
//       const user = usersMap.get(skillItem.ownerId);
      
//       if (!user) {
//         throw new Error(`User with id ${skillItem.ownerId} not found`);
//       }

//       return {
//         skillId: skillItem.id,
//         createDate: skillItem.createDate,
//         userName: user.name,
//         city: user.city,
//         age: user.age,
//         avatar_url: user.avatarUrl,
//         liked: skillItem.likes.includes(user.id), 
//         onRequest: skillItem.requested.includes(user.id),
//       };
//     });

//     return mergedCards;

//   } catch (error) {
//     console.error('Failed to fetch and merge cards:', error);
//     throw error;
//   }
// };