import { Issues } from './issues';
import { Message } from './messages';
import { Users } from './user';

export enum GameStatus {
  active = 'active',
  pending = 'pending',
  finished = 'finished',
  canceled = 'canceled',
}

export enum ScoreType {
  storyPoint = 'storyPoint',
  size = 'size',
  calories = 'calories',
}

export interface GameSettings {
  masterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  timer: boolean;
  scoreType: keyof typeof ScoreType;
  roundTime: number;
  cardsNumber: number;
  autoAdmitNewUsers: boolean;
  autoFlip: boolean;
}

export interface Room {
  roomId?: string;
  users: Users;
  messages: Array<Message>;
  issuesStore: Issues;
  issues?: Issues;
  gameStatus: keyof typeof GameStatus;
  gameSettings: GameSettings;
  gameTitle: string;
  currentIssueId?: string;
  roundIsActive?: boolean;
}

export interface RoomData {
  userId?: string;
  roomId: string;
  room: Room;
}
