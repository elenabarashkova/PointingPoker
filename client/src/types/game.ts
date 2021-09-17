import { GameStatus } from './room';

export interface ChangeGameStatusData {
  roomId: string;
  gameStatus: keyof typeof GameStatus;
}
