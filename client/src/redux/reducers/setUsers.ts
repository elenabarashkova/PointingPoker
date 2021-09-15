import { PayloadAction } from '@reduxjs/toolkit';
import { SET_USERS, UPDATE_USER } from '../action-types';
import { UserData, Users } from '../../types/user';

export const initialState = {};

export const users = (state: Users = initialState, { type, payload }: PayloadAction<Users | UserData>): Users => {
  if (type === SET_USERS) {
    return payload as Users;
  }
  if (type === UPDATE_USER) {
    const { userId, user } = payload as UserData;
    return {
      ...state,
      [userId]: user,
    };
  }

  return state;
};
