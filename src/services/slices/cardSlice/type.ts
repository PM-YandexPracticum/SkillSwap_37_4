import { TSkillTag } from '../../../components/cardTag/CardTag';

export type TCardData = {
  userEmail: string;
  likes: string[];
  createDate: string;
  userName: string;
  city: string;
  age: string;
  avatar_url: string;
  canTeach: TSkillTag[];
  wantLearn: TSkillTag[];
};

export type TCardDataApi = {
  userEmail: string;
  likes: string[];
  createDate: string;
  userName: string;
  city: string;
  age: string;
  avatar_url: string;
  canTeach: string[];
  wantLearn: string[];
};

export interface CardState {
  cards: TCardData[];
  filteredCardsByNew: TCardData[];
  filteredCardsByLike: TCardData[];
  loading: boolean;
  error: string | null;
}

export interface FilterParams {
  category?: string[];
  subcategory?: string[];
  searchType?: 'wantLearn' | 'canTeach' | 'all';
  matchName?: string;
  sortByNew?: boolean;
  sortByLike?: boolean;
  city?: string;
  gender?: string;
}
