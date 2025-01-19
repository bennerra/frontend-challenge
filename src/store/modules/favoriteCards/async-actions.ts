import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFavoriteCards } from '@/api/getFavoriteCards';

export const getCardFavoriteList = createAsyncThunk(
  'getCardFavoriteList',
  getFavoriteCards,
);
