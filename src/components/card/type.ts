import { TSkillTag } from '../cardTag/CardTag';

export type TCard = {
  userEmail: string;
  likes: string[];
  createDate: string;
  userName: string;
  city: string;
  age: string;
  avatar_url: string;
  canTeach: TSkillTag[];
  wantLearn: TSkillTag[];
  onClick: () => void;
};
