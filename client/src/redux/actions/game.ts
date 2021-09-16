import { PayloadAction } from '@reduxjs/toolkit';
import { GameSettings, GameStatus } from 'src/types/room';
import { SET_ALL_GAME_SETTINGS, SET_GAME_STATUS } from '../action-types';

export const setGameStatus = (gameStatus: keyof typeof GameStatus): PayloadAction<keyof typeof GameStatus> => ({
  type: SET_GAME_STATUS,
  payload: gameStatus,
});

export const setAllGameSettings = (gameSettings: GameSettings): PayloadAction<GameSettings> => ({
  type: SET_ALL_GAME_SETTINGS,
  payload: gameSettings,
});
