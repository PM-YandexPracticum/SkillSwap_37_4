import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice/userSlice';
import skillReducer from './slices/skillSlice/skillSlice';
import notifyReducer from '../slices/notifySlice/notifySlice';
import registerReducer from '../slices/registerSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  user: userReducer,
  skill: skillReducer,
  notify: notifyReducer,
  register: registerReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
