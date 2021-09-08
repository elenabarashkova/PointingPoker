import { ErrorResponse } from "./data";
import { GameSettings } from "./game";
import { Issue } from "./issue";
import { Message } from "./message";
import { Room } from "./room";
import { User } from "./user";

type DataType =
  | { room: Room | null; roomId: string }
  | { userId: string; user: User }
  | { issueId: string; issue: Issue }
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
