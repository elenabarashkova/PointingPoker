import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_USERS,
  SET_CURRENT_USER,
  SET_ROOM_ID,
  SET_IS_ROOM_VALID,
} from './action-types';
import { Users } from '../types/user';

export const setUsersAction = (users: Users): PayloadAction<Users> => ({
  type: SET_USERS,
  payload: users,
});

export const setCurrentUserAction = (userId: string): PayloadAction<string> => ({
  type: SET_CURRENT_USER,
  payload: userId,
});

export const setRoomIdAction = (roomId: string): PayloadAction<string> => ({
  type: SET_ROOM_ID,
  payload: roomId,
});

export const setIsRoomValid = (isRoomValid: boolean): PayloadAction<boolean> => ({
  type: SET_IS_ROOM_VALID,
  payload: isRoomValid,
});
