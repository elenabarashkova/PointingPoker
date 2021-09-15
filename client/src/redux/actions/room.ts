import { PayloadAction } from '@reduxjs/toolkit';
import { SET_ROOM_ID } from '../action-types';

export const setRoomIdAction = (roomId: string): PayloadAction<string> => ({
  type: SET_ROOM_ID,
  payload: roomId,
});
