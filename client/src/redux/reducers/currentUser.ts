import { PayloadAction } from '@reduxjs/toolkit';
import { SET_CURRENT_USER } from '../action-types';

export const initialState = '';

export const currentUserId = (state = initialState, { type, payload }: PayloadAction<string>): string => {
  if (type === SET_CURRENT_USER) {
    console.log('store', payload);
    return payload;
  }

  return state;
};
