import { TCard, TCardDataApi } from '../../../components/card/type';

export interface CardsResponse {
  cards: TCardDataApi[];
}

export interface LikeRequest {
  userId: string;
  skillId: string;
}

export interface LikeResponse {
  message: string;
  likesCount: number;
}

export interface FilterParams {
  startNum?: number;
  endNum?: number;
  category?: string[];
  subcategory?: string[];
  city?: string;
  gender?: string;
  matchName?: string;
  sortByNew?: boolean;
  sortByLike?: boolean;
  searchType?: string;
}

const URL = process.env.SKILLSWAP_API_URL || 'http://localhost:5000';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getCardsApi = (
  filterParams: FilterParams,
  currentUserId?: string
) =>
  fetch(`${URL}/api/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...filterParams,
      currentUserId
    })
  }).then((res) => {
    const response = checkResponse<CardsResponse>(res);
    console.log(response);
    return response;
  });

export const likeCardApi = (likeRequest: LikeRequest) =>
  fetch(`${URL}/api/cards/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likeRequest)
  }).then((res) => checkResponse<LikeResponse>(res));

export const dislikeCardApi = (likeRequest: LikeRequest) =>
  fetch(`${URL}/api/cards/dislike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likeRequest)
  }).then((res) => checkResponse<LikeResponse>(res));

export const getCardByIdApi = (id: string, currentUserId?: string) =>
  fetch(`${URL}/api/cards/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentUserId })
  }).then((res) => checkResponse<TCard>(res));
