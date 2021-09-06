import { PayloadAction } from '@reduxjs/toolkit';
import { CREATE_ROOM } from '../services/constants';
import { Room } from '../types/room';

export const createNewRoom = (room: Room): PayloadAction<Room> => ({
  type: CREATE_ROOM,
  payload: room,
});
