import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCards } from '@/api/getCards';

export const getCardList = createAsyncThunk('getCardList', getCards);
