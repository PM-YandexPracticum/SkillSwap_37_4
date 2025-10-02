import { TCard } from '../../../../components/card/type';
import {
  CreateSkillRequest,
  TSkill,
  UpdateSkillRequest
} from '../../../../types/skill';

const URL = process.env.SKILLSWAP_API_URL || 'http://localhost:5000';

export interface CreateSkillResponse extends TSkill {
  message: string;
}

export interface UpdateSkillResponse extends TSkill {
  message: string;
}

export interface DeleteSkillResponse {
  message: string;
}

export type TSkillPage = {
  skill: TSkill;
  card: TCard;
};

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getSkillByIdApi = (id: string) =>
  fetch(`${URL}/api/skills/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TSkill>(res));

export const getSkillPageByIdApi = (id: string) =>
  fetch(`${URL}/api/skills/skillPage/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TSkillPage>(res));

// GET /api/skills/owner/:ownerId - получить навыки по владельцу
export const getSkillsByOwnerApi = (ownerId: string) =>
  fetch(`${URL}/api/skills/owner/${ownerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TSkill[]>(res));

export const createSkillApi = (skillData: CreateSkillRequest) =>
  fetch(`${URL}/api/skills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(skillData)
  }).then((res) => checkResponse<CreateSkillResponse>(res));

export const updateSkillApi = (id: string, skillData: UpdateSkillRequest) =>
  fetch(`${URL}/api/skills/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(skillData)
  }).then((res) => checkResponse<UpdateSkillResponse>(res));

export const deleteSkillApi = (id: string) =>
  fetch(`${URL}/api/skills/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<string>(res));
