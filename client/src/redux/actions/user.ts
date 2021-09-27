import { PayloadAction } from '@reduxjs/toolkit';
import { UserData, Users } from 'src/types/user';
import {
  ALLOW_PARTICIPATION, SET_CURRENT_USER, SET_USERS, UPDATE_USER, 
} from '../action-types';

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

export const allowParticipation = (userId: string): PayloadAction<string> => ({
  type: ALLOW_PARTICIPATION,
  payload: userId,
});
