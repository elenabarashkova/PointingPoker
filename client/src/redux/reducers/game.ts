import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_ROOM_ID,
  SET_GAME_STATUS,
} from '../action-types';
import { Game } from '../../types/redusers';

export const initialState = {
  gameStatus: '',
  roomId: '',
  isRoomValid: false,
};

export const game = (
  state: Game = initialState,
  { type, payload }: PayloadAction<string | boolean>,
): Game => {
  if (type === SET_ROOM_ID) {
    return {
      ...state,
      roomId: payload as string,
    };
  }

  if (type === SET_GAME_STATUS) {
    return {
      ...state,
      gameStatus: payload as string,
    };
  }

  return state;
};
