export enum GameStatus {
  pending = 'pending',
  inProgress = 'inProgress',
  finished = 'finished',
  canceled = 'canceled',
}

export enum ScoreType {
  storyPoint = 'storyPoint',
}

export interface GameSettings {
  masterAsPlayer: boolean,
  changingCardInRoundEnd: boolean,
  timer: boolean,
  scoreType: ScoreType.storyPoint,
  roundTime: number,
}

export interface RoomInfo {
  users: [],
  messages: [],
  issues: [],
  gameStatus?: GameStatus,
  gameSettings?: GameSettings,
}

export interface RoomData {
  roomId: string,
  room: RoomInfo,
}

export type Room = Record<string, RoomInfo>;
