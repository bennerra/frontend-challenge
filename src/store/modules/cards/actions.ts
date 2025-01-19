import { createAction } from '@reduxjs/toolkit';

export const changeIsFavorite = createAction<string>('change is favorite');
