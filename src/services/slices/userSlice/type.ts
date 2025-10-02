import { TSkillTag } from '../../../components/cardTag/CardTag';

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  birthday: Date;
  aboutMe: string;
  city: string;
  gender: string;
  wantLearn: TSkillTag[];
  canLearn: TSkillTag[];
};
