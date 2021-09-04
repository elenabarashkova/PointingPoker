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
