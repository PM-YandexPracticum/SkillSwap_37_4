import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, TCardData, TCardDataApi, FilterParams } from './type';
import { getCardsApi, FilterParams as ApiFilterParams } from './cardSliceApi';
import { transformApiDataToCardData } from './cardSlice';

const initialState: CardState = {
  cards: [],
  filteredCardsByNew: [],
  filteredCardsByLike: [],
  loading: false,
  error: null
};

// Общая функция для создания thunk
const createCardsThunk = (
  name: string,
  defaultFilter: Partial<FilterParams> = {}
) =>
  createAsyncThunk(
    `cards/${name}`,
    async ({
      startNum,
      endNum,
      filter
    }: {
      startNum: number;
      endNum: number;
      filter: FilterParams;
    }) => {
      const apiFilter: ApiFilterParams = {
        startNum,
        endNum,
        ...filter,
        ...defaultFilter
      };

      const response = await getCardsApi(apiFilter);
      return {
        cards: response.cards.map(transformApiDataToCardData),
        filter: apiFilter,
        actionType: name
      };
    }
  );

// Создаем thunks с помощью общей функции
export const getCards = createCardsThunk('getCards');
export const fetchCards = createCardsThunk('fetchCards');
export const getNewCards = createCardsThunk('getNewCards', { sortByNew: true });
export const getPopularCards = createCardsThunk('getPopularCards', {
  sortByLike: true
});

// Общие обработчики состояний
const handlePending = (state: CardState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: CardState,
  action: any,
  errorMessage: string
) => {
  state.loading = false;
  state.error = action.error.message || errorMessage;
};

const handleFulfilled = (state: CardState, action: any) => {
  state.loading = false;
  const { cards, filter, actionType } = action.payload;

  switch (actionType) {
    case 'getCards':
      state.cards = cards;
      if (filter.sortByNew) state.filteredCardsByNew = cards;
      if (filter.sortByLike) state.filteredCardsByLike = cards;
      break;

    case 'fetchCards':
      state.cards.push(...cards);
      if (filter.sortByNew) state.filteredCardsByNew.push(...cards);
      if (filter.sortByLike) state.filteredCardsByLike.push(...cards);
      break;

    case 'getNewCards':
      state.filteredCardsByNew = cards;
      break;

    case 'getPopularCards':
      state.filteredCardsByLike = cards;
      break;
  }
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearCards: (state) => {
      state.cards = [];
      state.filteredCardsByNew = [];
      state.filteredCardsByLike = [];
    }
  },
  selectors: {
    cardsSelector: (state) => state.cards,
    filteredCardsByNewSelector: (state) => state.filteredCardsByNew,
    filteredCardsByLikeSelector: (state) => state.filteredCardsByLike,
    loadingSelector: (state) => state.loading,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    [getCards, fetchCards, getNewCards, getPopularCards].forEach((thunk) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, handleFulfilled)
        .addCase(thunk.rejected, (state, action) =>
          handleRejected(state, action, `Ошибка ${thunk.typePrefix}`)
        );
    });
  }
});

export const {
  cardsSelector,
  filteredCardsByNewSelector,
  filteredCardsByLikeSelector,
  loadingSelector,
  errorSelector
} = cardSlice.selectors;

export const { resetError, clearCards } = cardSlice.actions;
export default cardSlice.reducer;
