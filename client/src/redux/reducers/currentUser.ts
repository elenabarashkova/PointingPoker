import { PayloadAction } from '@reduxjs/toolkit';
import { SET_CURRENT_USER } from '../action-types';

export const initialState = '';

export const currentUserId = (state = initialState, { type, payload }: PayloadAction<string>): string => {
  if (type === SET_CURRENT_USER) {
    return payload;
  }

  return state;
};
