import { Users } from './user';

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
  scoreType: keyof typeof ScoreType.storyPoint;
  roundTime: number;
}

export interface Room {
  roomId?: string;
  users: Users;
  messages: Array<string>;
  issues: Array<string>;
  gameStatus: keyof typeof GameStatus;
  gameSettings: GameSettings;
}

export interface RoomData {
  roomId: string;
  room: Room;
}
