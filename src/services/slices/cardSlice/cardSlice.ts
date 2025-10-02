import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../../components/card/type';
import { SkillsFilterState } from '../../../components/skillsFilter/SkillsFilter';
import { SKILL_CATEGORY } from '../../../const/skillsCategoryMapping';
import { cardDataArray } from '../../../pages/catalog-page/cardsMockup';
import { TCardData, TCardDataApi } from './type';

export interface FilterObject {
  category: string[];
  subcategory: string[];
  wantLearn?: string;
  canLearn?: string;
  all?: string;
  matchName?: string;
  sortByNew?: boolean;
  sortByLike?: boolean;
  city?: string;
  gender?: string;
}

interface CardState {
  cards: TCard[];
  filteredCards: TCard[];
  filterState: SkillsFilterState;
  loading: boolean;
  error: string | null;
}


export const transformApiDataToCardData = (apiData: TCardDataApi): TCardData => ({
  ...apiData,
  canTeach: apiData.canTeach.map((skill) => ({ name: skill })),
  wantLearn: apiData.wantLearn.map((skill) => ({ name: skill }))
});


const createInitialFilterState = (): SkillsFilterState => {
  const filterState: SkillsFilterState = {};
  SKILL_CATEGORY.forEach((category) => {
    filterState[category.categoryName] = {
      selected: false,
      subcategories: Object.fromEntries(
        category.subcategoryName.map((sub) => [sub, false])
      )
    };
  });
  return filterState;
};

const initialState: CardState = {
  cards: cardDataArray,
  filteredCards: [],
  filterState: createInitialFilterState(),
  loading: false,
  error: null
};

const getCardSkills = (card: TCard) =>
  [...card.canTeach, ...card.wantLearn].map((skill) => skill.name);

const applyFilters = (cards: TCard[], filterObj: FilterObject): TCard[] =>
  cards.filter((card) => {
    const cardSkills = getCardSkills(card);

    if (filterObj.category?.length || filterObj.subcategory?.length) {
      const categoryMatch =
        !filterObj.category?.length ||
        filterObj.category.some((cat) => cardSkills.includes(cat));
      const subcategoryMatch =
        !filterObj.subcategory?.length ||
        filterObj.subcategory.some((sub) => cardSkills.includes(sub));
      if (!(categoryMatch && subcategoryMatch)) return false;
    }

    if (
      filterObj.wantLearn &&
      !card.wantLearn.some((skill) => skill.name.includes(filterObj.wantLearn!))
    )
      return false;
    if (
      filterObj.canLearn &&
      !card.canTeach.some((skill) => skill.name.includes(filterObj.canLearn!))
    )
      return false;

    if (filterObj.city && card.city !== filterObj.city) return false;
    if (filterObj.gender && (card as any).gender !== filterObj.gender)
      return false;
    if (
      filterObj.matchName &&
      !card.userName.toLowerCase().includes(filterObj.matchName.toLowerCase())
    )
      return false;

    return true;
  });

const applySorting = (cards: TCard[], filterObj: FilterObject): TCard[] => {
  if (filterObj.sortByNew) {
    return [...cards].sort(
      (a, b) =>
        new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
    );
  }
  if (filterObj.sortByLike) {
    return [...cards].sort((a, b) => b.likes.length - a.likes.length);
  }
  return cards;
};

const toggleLike = (card: TCard, isLike: boolean): TCard => {
  const currentUserLiked = card.likes.includes('currentUser');

  if (isLike && !currentUserLiked) {
    return { ...card, likes: [...card.likes, 'currentUser'] };
  }
  if (!isLike && currentUserLiked) {
    return {
      ...card,
      likes: card.likes.filter((like) => like !== 'currentUser')
    };
  }
  return card;
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCards: (
      state,
      action: PayloadAction<{
        startNum: number;
        endNum: number;
        filterObj: FilterObject;
      }>
    ) => {
      const { startNum, endNum, filterObj } = action.payload;

      const filtered = applyFilters(state.cards, filterObj);
      const sorted = applySorting(filtered, filterObj);

      state.filteredCards = sorted.slice(startNum, endNum + 1);
    },

    setLike: (state, action: PayloadAction<string>) => {
      const cardIndex = state.cards.findIndex(
        (card) => card.userEmail === action.payload
      );
      if (cardIndex !== -1) {
        state.cards[cardIndex] = toggleLike(state.cards[cardIndex], true);
      }
    },

    setDislike: (state, action: PayloadAction<string>) => {
      const cardIndex = state.cards.findIndex(
        (card) => card.userEmail === action.payload
      );
      if (cardIndex !== -1) {
        state.cards[cardIndex] = toggleLike(state.cards[cardIndex], false);
      }
    },

    updateFilterState: (state, action: PayloadAction<SkillsFilterState>) => {
      state.filterState = action.payload;
    }
  }
});

export const { getCards, setLike, setDislike, updateFilterState } =
  cardSlice.actions;
export default cardSlice.reducer;
