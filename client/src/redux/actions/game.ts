import { Action, PayloadAction } from '@reduxjs/toolkit';
import { StartRoundData } from 'src/types/game';
import { GameSettings, GameStatus } from 'src/types/room';
import {
  RESET_GAME, RESET_GAME_SETTINGS,
  SEND_GAME_REQUEST,
  SET_ALL_GAME_SETTINGS,
  SET_CAN_PARTICIPATE,
  SET_CURRENT_ISSUE_ID,
  SET_GAME_ERROR,
  SET_GAME_STATUS,
  SET_GAME_TITLE,
  SET_ROUND_IS_ACTIVE,
  START_ROUND,
  STOP_ROUND,
} from '../action-types';

export const setGameStatus = (
  gameStatus: keyof typeof GameStatus,
): PayloadAction<keyof typeof GameStatus> => ({
  type: SET_GAME_STATUS,
  payload: gameStatus,
});

export const resetGameToInitial = (): Action => ({
  type: RESET_GAME,
});

export const setAllGameSettings = (gameSettings: GameSettings): PayloadAction<GameSettings> => ({
  type: SET_ALL_GAME_SETTINGS,
  payload: gameSettings,
});

export const resetGameSettings = (): Action => ({
  type: RESET_GAME_SETTINGS,
});

export const setTitle = (gameTitle: string): PayloadAction<string> => ({
  type: SET_GAME_TITLE,
  payload: gameTitle,
});

export const startRoundAction = (
  startRoundData: StartRoundData,
): PayloadAction<StartRoundData> => ({
  type: START_ROUND,
  payload: startRoundData,
});

export const stopRound = (roundIsActive: boolean): PayloadAction<boolean> => ({
  type: STOP_ROUND,
  payload: roundIsActive,
});

export const sendGameRequest = (): Action => ({
  type: SEND_GAME_REQUEST,
});

export const setGameError = (): Action => ({
  type: SET_GAME_ERROR,
});

export const seCurrentIssueId = (issueId: string): PayloadAction<string> => ({
  type: SET_CURRENT_ISSUE_ID,
  payload: issueId,
});

export const setRoundIsActive = (isActive: boolean): PayloadAction<boolean> => ({
  type: SET_ROUND_IS_ACTIVE,
  payload: isActive,
});

export const setCanParticipate = (canParticipate: boolean): PayloadAction<boolean> => ({
  type: SET_CAN_PARTICIPATE,
  payload: canParticipate,
});
