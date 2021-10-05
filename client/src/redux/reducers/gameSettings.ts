import { PayloadAction } from '@reduxjs/toolkit';
import { GameSettings, ScoreType } from '../../types/room';
import { RESET_GAME_SETTINGS, SET_ALL_GAME_SETTINGS } from '../action-types';

export const initialState = {
  masterAsPlayer: true,
  changingCardInRoundEnd: false,
  timer: true,
  scoreType: ScoreType.storyPoint,
  roundTime: 140,
  cardsNumber: 6,
  autoAdmitNewUsers: true,
  autoFlip: true,
};

export const gameSettings = (
  state: GameSettings = initialState,
  { type, payload }: PayloadAction<GameSettings>,
): GameSettings => {
  if (type === SET_ALL_GAME_SETTINGS) {
    return { ...state, ...payload };
  }

  if (type === RESET_GAME_SETTINGS) {
    return initialState;
  }

  return state;
};
