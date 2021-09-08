import { Issue } from './issues';
import { Message } from './messages';
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
  scoreType: keyof typeof ScoreType;
  roundTime: number;
}

export interface Room {
  roomId?: string;
  users: Users;
  messages: Array<Message>;
  issues: Array<Issue>;
  gameStatus: keyof typeof GameStatus;
  gameSettings: GameSettings;
}

export interface RoomData {
  userId?: string;
  roomId: string;
  room: Room;
}
