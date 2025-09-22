export interface TSkill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillRequest {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  userId: string;
}
