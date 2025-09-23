export interface TSkill {
  id: string;
  photoUrl: string[];
  name: string;
  category: string;
  subCategory: string;
  description: string;
}

export interface CreateSkillRequest {
  photoUrl: string[];
  name: string;
  category: string;
  subCategory: string;
  description: string;
  userId: string;
}
