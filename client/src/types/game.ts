import { Issue, Issues } from './issues';
import { GameStatus } from './room';

export interface ChangeGameStatusData {
  roomId: string;
  gameStatus: keyof typeof GameStatus;
}

export interface StartRoundData {
  roundIsActive: boolean;
  currentIssueId: string;
  issues?: Issues;
}

export interface StopRoundData {
  roundIsActive: boolean;
  issueId: string;
  issue: Issue;
}
