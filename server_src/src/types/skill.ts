export type SkillCardProps = {
  photoUrl: string[];
  name: string;
  category: string;
  subCategory: string;
  description: string;
};

export type CreateSkillRequest = SkillCardProps & {
  ownerId: string;
};

export type UpdateSkillRequest = SkillCardProps & {
  id: string;
};
