import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardState, TCardData, TCardDataApi, FilterParams } from './type';
import { getCardsApi, FilterParams as ApiFilterParams } from './cardSliceApi';

const initialState: CardState = {
  cards: [],
  filteredCardsByNew: [],
  filteredCardsByLike: [],
  loading: false,
  error: null
};

const transformApiDataToCardData = (apiData: TCardDataApi): TCardData => ({
  ...apiData,
  canTeach: apiData.canTeach.map((skill) => ({ name: skill })),
  wantLearn: apiData.wantLearn.map((skill) => ({ name: skill }))
});

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
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
      ...filter
    };

    const response = await getCardsApi(apiFilter);
    return response.cards.map(transformApiDataToCardData);
  }
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
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
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCards.fulfilled,
        (state, action: PayloadAction<TCardData[]>) => {
          state.loading = false;
          state.cards.push(...action.payload);

          const newCards = action.payload.filter(() => true); // здесь можно добавить логику фильтрации
          state.filteredCardsByNew.push(...newCards);
          state.filteredCardsByLike.push(...newCards);
        }
      )
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки карточек';
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

export const { resetError } = cardSlice.actions;
export default cardSlice.reducer;
