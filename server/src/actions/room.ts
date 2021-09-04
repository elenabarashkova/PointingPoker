import { initGameSettings } from "../store";
import { GameStatus } from "../types/game";
import { StoreSchema } from "../types/store";

export const createRoom = (store: StoreSchema, roomId: string): void => {
  store[roomId] = {
    users: {},
    messages: [],
    issues: [],
    gameStatus: GameStatus.pending,
    gameSettings: initGameSettings,
  };
};
