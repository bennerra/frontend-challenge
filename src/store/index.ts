import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { cards } from '@/store/modules/cards/reducer';
import { favoriteCards } from '@/store/modules/favoriteCards/reducer';
import { messages } from '@/store/modules/common/messges/reducer';

export const selectRoot = (state: RootState) => state;

export const rootReducer = combineReducers({
  cards,
  favoriteCards,
  messages,
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
