export interface TSkill {
  id: string;
  photoUrl: string[];
  name: string;
  category: string;
  subCategory: string;
  description: string;
}

export interface CreateSkillRequest {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  userId: string;
}
