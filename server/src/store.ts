import { GameSettings, ScoreType } from "./types/game";
import { StoreSchema } from "./types/store";

export const initialGameSettings: GameSettings = {
  masterAsPlayer: true,
  changingCardInRoundEnd: false,
  timer: true,
  scoreType: ScoreType.storyPoint,
  roundTime: 140,
};

export const store: StoreSchema = {};
