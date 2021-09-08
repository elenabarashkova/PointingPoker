import { PayloadAction } from '@reduxjs/toolkit';
import { SET_USERS } from '../action-types';
import { Users } from '../../types/user';

export const initialState = {};

export const users = (state: Users = initialState, { type, payload }: PayloadAction<Users>): Users => {
  if (type === SET_USERS) {
    return payload;
  }

  return state;
};
