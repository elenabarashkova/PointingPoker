import { PayloadAction } from '@reduxjs/toolkit';
import { CREATE_ROOM } from '../../services/constants';
import { Room } from '../../types/room';

export const initialState = [];

export const addNewRoom = (state = initialState, action: PayloadAction<Room>): Array<Room> => {
  if (action.type === CREATE_ROOM) {
    return [...state, action.payload];
  }

  return state;
};
