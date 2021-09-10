import { PayloadAction } from '@reduxjs/toolkit';
import { Users } from 'src/types/user';
import { SET_CURRENT_USER, SET_USERS } from '../action-types';

export const setUsersAction = (users: Users): PayloadAction<Users> => ({
  type: SET_USERS,
  payload: users,
});

export const setCurrentUserAction = (userId: string): PayloadAction<string> => ({
  type: SET_CURRENT_USER,
  payload: userId,
});
