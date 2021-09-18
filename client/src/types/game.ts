import { Issue } from './issues';
import { GameStatus } from './room';

export interface ChangeGameStatusData {
  roomId: string;
  gameStatus: keyof typeof GameStatus;
}
export interface StartGameData {
  gameStatus: 'active';
  issueId: string; 
  issue: Issue; 
}
