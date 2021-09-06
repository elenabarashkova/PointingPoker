import { initialGameSettings } from "../store";
import { GameStatus } from "../types/game";
import { StoreSchema } from "../types/store";

export const createRoom = (store: StoreSchema, roomId: string): void => {
  store[roomId] = {
    users: {},
    messages: [],
    issues: [],
    gameStatus: GameStatus.pending,
    gameSettings: initialGameSettings,
  };
};

export const createRoomId = (store: StoreSchema): string => {
  let roomId = Date.now().toString();
  if (store[roomId]) {
    roomId = createRoomId(store);
  }
  return roomId;
};
