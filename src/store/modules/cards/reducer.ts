import { createReducer } from '@reduxjs/toolkit';

import { changeIsFavorite } from '@/store/modules/cards/actions';
import { getCardList } from '@/store/modules/cards/async-actions';
import { type CardDataWithFavorite } from '@/components/CardList/types';

type Cards = {
  error: string;
  cards: CardDataWithFavorite[] | null;
  isLoading: boolean;
};

const initialValue: Cards = {
  error: '',
  cards: null,
  isLoading: false,
};

export const cards = createReducer(initialValue, (builder) =>
  builder
    .addCase(getCardList.fulfilled, (state, action) => {
      if (action.payload && 'message' in action.payload) {
        state.error = action.payload.message;
        state.cards = null;
        return;
      }

      if (Array.isArray(action.payload)) {
        state.cards = action.payload;
        state.error = '';
      }

      state.isLoading = false;
    })
    .addCase(getCardList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(changeIsFavorite, (state, action) => {
      if (state.cards) {
        state.cards = state.cards.map((item: CardDataWithFavorite) =>
          item.id === action.payload
            ? { ...item, isFavorite: !item.isFavorite }
            : item,
        );
      }
    }),
);
