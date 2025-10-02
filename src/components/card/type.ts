import { TSkillTag } from '../cardTag/CardTag';

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

export type TCard = TCardData & {
  onClick?: () => void;
};
