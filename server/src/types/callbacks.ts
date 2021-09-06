import { ErrorResponse } from "./data";
import { Message } from "./message";
import { Room } from "./store";
import { User } from "./user";

type DataType =
  | { room: Room; roomId: string }
  | { room: Room; roomId: string }
  | { userId: string; user: User }
  | Message
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
