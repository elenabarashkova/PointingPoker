import { PayloadAction } from '@reduxjs/toolkit';
import { SET_IS_ROOM_VALID, SET_ROOM_ID } from '../action-types';

export const setRoomIdAction = (roomId: string): PayloadAction<string> => ({
  type: SET_ROOM_ID,
  payload: roomId,
});

export const setIsRoomValid = (isRoomValid: boolean): PayloadAction<boolean> => ({
  type: SET_IS_ROOM_VALID,
  payload: isRoomValid,
});
