// server/src/types/card.ts
export type TCard = {
  skillId: string;
  createDate: string;
  userName: string;
  city: string;
  age: string;
  avatar_url: string;
  liked: boolean;
  onRequest: boolean;
  canTeach: string[];
  wantLearn: string[];
}

export type FilterObject = {
  category?: string[];
  subcategory?: string[];
  searchType?: 'wantLearn' | 'canLearn' | 'all';
  matchName?: string;
  sortByNew?: boolean;
  sortByLike?: boolean;
  city?: string;
  gender?: string;
  likedByUser?: boolean;
}

export type LikeRequest = {
  userId: string;
  skillId: string;
}
