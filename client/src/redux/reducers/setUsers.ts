import { PayloadAction } from '@reduxjs/toolkit';
import { UserData, Users } from '../../types/user';
import { ALLOW_PARTICIPATION, SET_USERS, UPDATE_USER } from '../action-types';

export const initialState = {};

export const users = (
  state: Users = initialState,
  { type, payload }: PayloadAction<Users | UserData | string>,
): Users => {
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
  if (type === ALLOW_PARTICIPATION) {
    const userId = payload as string;
    return {
      ...state,
      [userId]: { ...state[userId], canParticipate: true },
    };
  }

  return state;
};
