import { createReducer } from '@reduxjs/toolkit';

import { changeIsFavoriteList } from '@/store/modules/favoriteCards/actions';
import type { CardDataWithFavorite } from '@/components/CardList/types';
import { getCardFavoriteList } from '@/store/modules/favoriteCards/async-actions';

type FavoriteCards = {
  error: string;
  favoriteCards: CardDataWithFavorite[] | null;
  isLoading: boolean;
  isChanged: boolean;
};

const initialValue: FavoriteCards = {
  error: '',
  favoriteCards: null,
  isLoading: false,
  isChanged: false,
};

export const favoriteCards = createReducer(initialValue, (builder) =>
  builder
    .addCase(getCardFavoriteList.fulfilled, (state, action) => {
      if (action.payload && 'message' in action.payload) {
        state.error = action.payload.message;
        state.favoriteCards = null;
        return;
      }

      if (Array.isArray(action.payload)) {
        state.favoriteCards = action.payload;
        state.error = '';
      }

      state.isLoading = false;
      state.isChanged = false;
    })
    .addCase(getCardFavoriteList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(changeIsFavoriteList, (state, action) => {
      if (state.favoriteCards) {
        state.favoriteCards = state.favoriteCards.map(
          (item: CardDataWithFavorite) =>
            item.id === action.payload
              ? { ...item, isFavorite: !item.isFavorite }
              : item,
        );
      }

      state.isChanged = true;
    }),
);
