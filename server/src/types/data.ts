import { User } from "./user";

export interface ConnectionData {
  roomId: string;
  user: User;
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

export interface ErrorResponse {
  status: number;
  error: string;
}
