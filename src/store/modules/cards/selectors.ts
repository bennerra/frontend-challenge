import { createSelector } from '@reduxjs/toolkit';

import { selectRoot } from '@/store';

const cardsState = createSelector(selectRoot, (root) => root.cards);

export const selectCards = createSelector(cardsState, (state) => state.cards);
export const selectCardsError = createSelector(
  cardsState,
  (state) => state.error,
);
export const selectCardsIsLoading = createSelector(
  cardsState,
  (state) => state.isLoading,
);
