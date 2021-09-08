export enum GameStatus {
  pending = "pending",
  active = "active",
  finished = "finished",
  canceled = "canceled",
}

export enum ScoreType {
  storyPoint = "storyPoint",
}

export interface GameSettings {
  masterAsPlayer?: boolean;
  changingCardInRoundEnd?: boolean;
  timer?: boolean;
  scoreType?: keyof typeof ScoreType;
  roundTime?: number;
}

export interface GameSettingsData {
  roomId: string;
  settings: GameSettings;
}

export interface GameStatusData {
  roomId: string;
  gameStatus: keyof typeof GameStatus;
}
