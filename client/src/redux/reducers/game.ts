import { PayloadAction } from '@reduxjs/toolkit';
import { StartRoundData } from 'src/types/game';
import { Game } from '../../types/redusers';
import {
  RESET_GAME,
  SEND_GAME_REQUEST,
  SET_CAN_PARTICIPATE,
  SET_CURRENT_ISSUE_ID,
  SET_GAME_ERROR,
  SET_GAME_STATUS,
  SET_GAME_TITLE,
  SET_ROOM_ID,
  SET_ROUND_IS_ACTIVE,
  START_ROUND,
  STOP_ROUND,
} from '../action-types';

export const initialState = {
  gameStatus: '',
  roomId: '',
  isRoomValid: false,
  gameTitle: '',
  currentIssueId: '',
  roundIsActive: false,
  error: false,
  isLoading: false,
  canParticipate: true,
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

  if (type === RESET_GAME) {
    return initialState;
  }

  if (type === SET_GAME_TITLE) {
    return {
      ...state,
      gameTitle: payload as string,
    };
  }

  if (type === START_ROUND) {
    const { roundIsActive, currentIssueId } = payload as StartRoundData;
    return {
      ...state,
      currentIssueId,
      roundIsActive,
      isLoading: false,
    };
  }

  if (type === STOP_ROUND) {
    return {
      ...state,
      roundIsActive: payload as boolean,
      canParticipate: true,
    };
  }

  if (type === SET_CURRENT_ISSUE_ID) {
    return {
      ...state,
      currentIssueId: payload as string,
    };
  }

  if (type === SET_ROUND_IS_ACTIVE) {
    return {
      ...state,
      roundIsActive: payload as boolean,
    };
  }

  if (type === SET_CAN_PARTICIPATE) {
    return {
      ...state,
      canParticipate: payload as boolean,
    };
  }

  if (type === SEND_GAME_REQUEST) {
    return { ...state, isLoading: true, error: false };
  }

  if (type === SET_GAME_ERROR) {
    return { ...state, isLoading: false, error: true };
  }

  return state;
};
