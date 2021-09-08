import { PayloadAction } from '@reduxjs/toolkit';
import { SET_ROOM_ID, SET_IS_ROOM_VALID } from '../action-types';
import { Game } from '../../types/redusers';

export const initialState = {
  gameStatus: '',
  gameId: '',
  isRoomValid: false,
};

export const game = (state: Game = initialState, { type, payload }: PayloadAction<string | boolean>): Game => {
  if (type === SET_ROOM_ID) {
    return {
      ...state,
      gameId: payload as string,
    };
  }

  if (type === SET_IS_ROOM_VALID) {
    return {
      ...state,
      isRoomValid: payload as boolean,
    };
  }

  return state;
};
