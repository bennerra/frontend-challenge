import { createSelector } from '@reduxjs/toolkit';

import { selectRoot } from '@/store';

const messagesState = createSelector(selectRoot, (root) => root.messages);

export const selectMessage = createSelector(
  messagesState,
  (state) => state.message,
);
