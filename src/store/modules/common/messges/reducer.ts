import { createReducer } from '@reduxjs/toolkit';

import {
  addMessage,
  removeMessage,
} from '@/store/modules/common/messges/actions';

type Message = {
  message: string;
};

const initialValue: Message = {
  message: '',
};

export const messages = createReducer(initialValue, (builder) => {
  builder
    .addCase(addMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(removeMessage, (state) => {
      state.message = '';
    });
});
