import { GameSettings, GameStatus } from "./game";
import { Issue } from "./issue";
import { Message } from "./message";
import { Users } from "./user";

export interface Room {
  users: Users;
  messages: Message[];
  issues: Issue[];
  gameStatus: keyof typeof GameStatus;
  gameSettings: GameSettings;
}

export interface StoreSchema {
  [id: string]: Room;
}
