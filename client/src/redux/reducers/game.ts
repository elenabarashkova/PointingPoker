import { PayloadAction } from '@reduxjs/toolkit';
import { StartRoundData } from 'src/types/game';
import { Game } from '../../types/redusers';
import {
  SEND_REQUEST,
  SET_ERROR,
  SET_GAME_STATUS, SET_GAME_TITLE, SET_ROOM_ID, START_ROUND
} from '../action-types';

export const initialState = {
  gameStatus: '',
  roomId: '',
  isRoomValid: false,
  gameTitle: 'Sprint Plan',
  currentIssueId: '',
  roundIsActive: false,
  error: false,
  isLoading: false,
};

export const game = (
  state: Game = initialState,
  { type, payload }: PayloadAction<string | boolean | StartRoundData>,
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

  if (type === SET_GAME_TITLE) {
    return {
      ...state,
      gameTitle: payload as string,
    };
  }

  if (type === START_ROUND) {
    const {roundIsActive, currentIssueId} = payload as StartRoundData;
    return {
      ...state, currentIssueId: currentIssueId, roundIsActive: roundIsActive
    };
  }

  if (type === SEND_REQUEST) {
    return { ...state, isLoading: true, error: false };
  }

  if (type === SET_ERROR) {
    return { ...state, isLoading: false, error: true };
  }

  return state;
};
