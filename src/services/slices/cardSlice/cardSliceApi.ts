import { TCard, TCardDataApi } from '../../../components/card/type';
import { cardDataArray } from '../../../pages/catalog-page/cardsMockup';

export const CATEGORY_TO_TAGS: Record<string, string[]> = {
  'Бизнес и карьера': [
    'Тайм менеджмент',
    'Проектное управление',
    'Управление командой',
    'Маркетинг и реклама',
  ],
  'Творчество и искусство': ['Игра на барабанах', 'Медитация'],
};

export const SUBCATEGORY_TO_TAG: Record<string, string> = {
  'Тайм-менеджмент': 'Тайм менеджмент',
  'Управление командой': 'Управление командой',
  'Маркетинг и реклама': 'Маркетинг и реклама',
};


const n = (s: string) => s.trim().toLowerCase();

const expandToTags = (category?: string[], subcategory?: string[]) => {
  if (subcategory && subcategory.length) {
    return new Set(
      subcategory.map((s) => n(SUBCATEGORY_TO_TAG[s] ?? s))
    );
  }
  const tags = new Set<string>();
  category?.forEach((c) => {
    CATEGORY_TO_TAGS[c]?.forEach((t) => tags.add(n(t)));
  });
  return tags;
};

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

const URL = process.env.SKILLSWAP_API_URL || 'http://localhost:5050';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

/* export const getCardsApi = (.  РЕАЛИЗАЦИЯ С БЕКОМ
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
  }).then((res) => checkResponse<TCard>(res)); */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const toApi = (c: TCard): TCardDataApi => ({
  userEmail: c.userEmail,
  likes: c.likes,
  createDate: c.createDate,
  userName: c.userName,
  city: c.city,
  age: c.age,
  avatar_url: c.avatar_url,
  canTeach: c.canTeach.map((t) => t.name),
  wantLearn: c.wantLearn.map((t) => t.name)
});

const listMatches = (wanted: Set<string>, list: { name: string }[]) => {
  if (!wanted.size) return list.length > 0;
  return list.some((t) => wanted.has(n(t.name)));
};

const applyFilter = (arr: TCard[], f: FilterParams): TCard[] => {
  let res = [...arr];

  const wantedTags = expandToTags(f.category, f.subcategory);

  if (f.city) {
    res = res.filter((c) => c.city === f.city);
  }
  if (f.matchName) {
    const needle = n(f.matchName);
    res = res.filter((c) => n(c.userName).includes(needle));
  }

  const type = (f.searchType === 'canLearn' ? 'canTeach' : f.searchType) || 'all';

  if (type === 'wantLearn') {
    res = res.filter((c) => listMatches(wantedTags, c.wantLearn));
  } else if (type === 'canTeach') {
    res = res.filter((c) => listMatches(wantedTags, c.canTeach));
  } else {
    if (wantedTags.size) {
      res = res.filter(
        (c) => listMatches(wantedTags, c.canTeach) || listMatches(wantedTags, c.wantLearn)
      );
    }
  }

  if (f.gender) {
    const g = f.gender.toLowerCase();
    res = res.filter((c) => (c as any).gender?.toLowerCase() === g);
  }

  if (f.sortByNew) {
    res = [...res].sort((a, b) => +new Date(b.createDate) - +new Date(a.createDate));
  }
  if (f.sortByLike) {
    res = [...res].sort((a, b) => b.likes.length - a.likes.length);
  }

  return res;
};

export const getCardsApi = async (filterParams: FilterParams, currentUserId?: string): Promise<CardsResponse> => {
  await delay(250);
  const filtered = applyFilter(cardDataArray as TCard[], filterParams);
  const start = filterParams.startNum ?? 0;
  const end = filterParams.endNum ?? (filtered.length - 1);
  const slice = filtered.slice(start, end + 1);
  return { cards: slice.map(toApi)};
}

let mockLikeMap = new Map<string, number>();

export const likeCardApi = async (likeRequest: LikeRequest): Promise<LikeResponse> => {
  await delay(150);
  const prev = mockLikeMap.get(likeRequest.skillId) ?? 0;
  const next = prev + 1;
  mockLikeMap.set(likeRequest.skillId, next);
  return { message: 'liked', likesCount: next};
};

export const dislikeCardApi = async (likeRequest: LikeRequest): Promise<LikeResponse> => {
  await delay(150);
  const prev = mockLikeMap.get(likeRequest.skillId) ?? 0;
  const next = Math.max(0, prev - 1);
  mockLikeMap.set(likeRequest.skillId, next);
  return { message: 'disliked', likesCount: next};
};

export const getCardByIdApi = async (id: string): Promise<TCard> => {
  await delay(200);
  const idx = Number(id) % cardDataArray.length;
  return cardDataArray[idx] as TCard;
}