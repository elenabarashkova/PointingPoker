import { Issue } from './issue';
import { User } from './user';

export interface NewUserData {
  roomId: string;
  user: User;
}

export interface AccessData {
  roomId: string;
  user: User;
  userId: string;
  confirmation: boolean;
}

export interface MessageData {
  roomId: string;
  text: string;
}

export interface UserData {
  userId: string;
  roomId: string;
}

export interface VotingData {
  confirm: boolean;
  kickedUserId: string;
  roomId: string;
}

export interface GameData {
  issueId: string;
  roomId: string;
  finalVote?: string;
}

export interface GameVotingData {
  issueId: string;
  roomId: string;
  vote: string;
}

export interface ErrorResponse {
  status: number;
  error: string;
}

export interface NewIssueData {
  roomId: string;
  issue: Issue;
}

export interface IssueData {
  roomId: string;
  issueId: string;
}

export interface UpdatedIssueData {
  roomId: string;
  issueId: string;
  issue: Issue;
}
