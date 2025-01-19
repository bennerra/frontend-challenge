import { createAction } from '@reduxjs/toolkit';

export const addMessage = createAction<string>('add message');
export const removeMessage = createAction('remove message');
