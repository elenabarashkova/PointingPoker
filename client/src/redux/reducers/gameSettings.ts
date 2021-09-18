import { PayloadAction } from '@reduxjs/toolkit';
import { GameSettings, ScoreType } from '../../types/room';
import { SET_ALL_GAME_SETTINGS } from '../action-types';

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
  { type, payload }: PayloadAction<GameSettings | keyof typeof ScoreType | boolean | number>,
): GameSettings => {
  if (type === SET_ALL_GAME_SETTINGS) {
    return payload as GameSettings;
  }

  return state;
};
