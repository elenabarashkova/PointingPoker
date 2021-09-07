import { User } from './user';

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
  masterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  timer: boolean;
  scoreType: ScoreType.storyPoint;
  roundTime: number;
}

export interface Room {
  roomId?: string;
  users: Array<User>;
  messages: Array<string>;
  issues: Array<string>;
  gameStatus: GameStatus;
  gameSettings: GameSettings;
}

export interface RoomData {
  roomId: string;
  room: Room;
}
