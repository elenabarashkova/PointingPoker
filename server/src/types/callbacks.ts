import { ErrorResponse } from './data';
import { GameSettings, GameStatus } from './game';
import { Issue } from './issue';
import { Message } from './message';
import { Room, Round } from './room';
import { User } from './user';

type DataType =
  | { room: Room | null; roomId: string }
  | { room: Room | null; newUserId: string }
  | { userId?: string; user?: User; message?: string }
  | { kickedUserId: string; kickedUser: User }
  | {
      issueId: string;
      issue?: Issue;
      finalVote?: string;
      gameStatus?: keyof typeof GameStatus;
    }
  | { currentRound: Round | null }
  | Message
  | GameSettings
  | Issue
  | boolean
  | string;

type ResponseType =
  | {
      status?: number;
      data?: DataType;
      error?: string;
    }
  | ErrorResponse;

export type EventCallback = (response: ResponseType) => void;

export type RedisGetAsyncType = (key: string) => Promise<string | null>;
export type RedisSetAsyncType = (
  key: string,
  value: string
) => Promise<unknown>;
