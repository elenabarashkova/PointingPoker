import { Action, PayloadAction } from '@reduxjs/toolkit';
import { StartRoundData } from 'src/types/game';
import { GameSettings, GameStatus } from 'src/types/room';
import {
  SEND_GAME_REQUEST, SET_ALL_GAME_SETTINGS, SET_GAME_ERROR, SET_GAME_STATUS, SET_GAME_TITLE, START_ROUND, STOP_ROUND,
} from '../action-types';

export const setGameStatus = (gameStatus: keyof typeof GameStatus): PayloadAction<keyof typeof GameStatus> => ({
  type: SET_GAME_STATUS,
  payload: gameStatus,
});

export const setAllGameSettings = (gameSettings: GameSettings): PayloadAction<GameSettings> => ({
  type: SET_ALL_GAME_SETTINGS,
  payload: gameSettings,
});

export const setTitle = (gameTitle: string): PayloadAction<string> => ({
  type: SET_GAME_TITLE,
  payload: gameTitle,
});

export const startRoundAction = (startRoundData: StartRoundData): PayloadAction<StartRoundData> => ({
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
