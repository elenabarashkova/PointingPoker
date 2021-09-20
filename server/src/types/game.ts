export enum GameStatus {
  pending = 'pending',
  active = 'active',
  finished = 'finished',
  canceled = 'canceled',
}

export enum ScoreType {
  storyPoint = 'storyPoint',
}

export interface GameSettings {
  masterAsPlayer?: boolean;
  changingCardInRoundEnd?: boolean;
  timer: boolean;
  scoreType: keyof typeof ScoreType;
  roundTime: number;
  cardsNumber: number;
  autoAdmitNewUsers: boolean;
  autoFlip: boolean;
}

export interface GameData {
  roomId: string;
  settings: GameSettings;
  gameStatus: keyof typeof GameStatus;
  gameTitle: string;
}
