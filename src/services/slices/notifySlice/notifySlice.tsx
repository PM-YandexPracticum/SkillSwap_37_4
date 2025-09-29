import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NotificationData, NotifyState } from './type';
import { clearNotifyApi, getNotifyToidApi } from './notifyApi';

export const getNotifyToid = createAsyncThunk<NotificationData[], string>(
  'notify/getNotifyToid',
  async (userId) => {
    const data = await getNotifyToidApi(userId);
    return data.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }
);

export const clearNotify = createAsyncThunk<{ removed: string[] }, string[]>(
  'notify/clearNotify',
  async (ids) => clearNotifyApi(ids)
);

const initialState: NotifyState = {
  items: [],
  loading: false,
  error: null
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    markAllAsRead(state) {
      state.items.forEach((n) => (n.viewed = true));
    },
    markOneAsRead(state, action: PayloadAction<string>) {
      const n = state.items.find((x) => x.notifyId === action.payload);
      if (n) n.viewed = true;
    }
  },
  extraReducers: (b) => {
    b.addCase(getNotifyToid.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(getNotifyToid.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.items = payload;
      s.lastFetched = new Date().toISOString();
    });
    b.addCase(getNotifyToid.rejected, (s, { error }) => {
      s.loading = false;
      s.error = error.message ?? 'Ошибка загрузки';
    });

    b.addCase(clearNotify.fulfilled, (s, { payload }) => {
      const ids = new Set(payload.removed);
      s.items = s.items.filter((n) => !ids.has(n.notifyId));
    });
  }
});

export const { markAllAsRead, markOneAsRead } = notifySlice.actions;
export default notifySlice.reducer;

export const selectNotifyState = (state: any) => state.notify as NotifyState;
export const selectNewNotifications = (state: any) =>
  (state.notify.items as NotificationData[]).filter((n) => !n.viewed);
export const selectViewedNotifications = (state: any) =>
  (state.notify.items as NotificationData[]).filter((n) => n.viewed);
