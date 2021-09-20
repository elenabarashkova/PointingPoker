import { GameSettings, ScoreType } from '../types/game';

export const INIT_GAME_SETTINGS: GameSettings = {
  masterAsPlayer: true,
  changingCardInRoundEnd: false,
  timer: true,
  scoreType: ScoreType.storyPoint,
  roundTime: 140,
  cardsNumber: 6,
  autoAdmitNewUsers: true,
  autoFlip: true,
};
