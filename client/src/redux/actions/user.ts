import { PayloadAction } from '@reduxjs/toolkit';
import { UserData, Users } from 'src/types/user';
import { SET_CURRENT_USER, UPDATE_USER, SET_USERS } from '../action-types';

export const setUsersAction = (users: Users): PayloadAction<Users> => ({
  type: SET_USERS,
  payload: users,
});

export const setCurrentUserAction = (userId: string): PayloadAction<string> => ({
  type: SET_CURRENT_USER,
  payload: userId,
});

export const updateUserAction = (userData: UserData): PayloadAction<UserData> => ({
  type: UPDATE_USER,
  payload: userData,
});
