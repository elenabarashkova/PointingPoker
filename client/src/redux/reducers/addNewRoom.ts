import { PayloadAction } from '@reduxjs/toolkit';
import { CREATE_ROOM } from '../../services/constants';
import { Room } from '../../types/room';

export const initialState = {};

export const addNewRoom = (state = initialState, { type, payload }: PayloadAction<Room>): Room | any => {
  if (type === CREATE_ROOM) {
    return payload;
  }

  return state;
};
