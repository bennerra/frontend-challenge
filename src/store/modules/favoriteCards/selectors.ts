import { createSelector } from '@reduxjs/toolkit';

import { selectRoot } from '@/store';

const favoriteCardsState = createSelector(
  selectRoot,
  (root) => root.favoriteCards,
);

export const selectFavoriteCards = createSelector(
  favoriteCardsState,
  (state) => state.favoriteCards,
);

export const selectFavoriteCardsError = createSelector(
  favoriteCardsState,
  (state) => state.error,
);

export const selectFavoriteCardsIsLoading = createSelector(
  favoriteCardsState,
  (state) => state.isLoading,
);

export const selectFavoriteCardsIsChanged = createSelector(
  favoriteCardsState,
  (state) => state.isChanged,
);
