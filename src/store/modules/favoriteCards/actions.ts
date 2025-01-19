import { createAction } from '@reduxjs/toolkit';

export const changeIsFavoriteList = createAction<string>(
  'change is favorite list',
);
