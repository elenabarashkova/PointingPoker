import { INIT_GAME_SETTINGS } from "../constants/game";
import { GameStatus } from "../types/game";
import { Room } from "../types/store";
import { User, UserRole, UserStatus } from "../types/user";

export const createRoom = (userId: string, user: User): Room => ({
  users: {
    [userId]: {
      ...user,
      role: UserRole.master,
      status: UserStatus.active,
    },
  },
  messages: [],
  issues: [],
  gameStatus: GameStatus.pending,
  gameSettings: INIT_GAME_SETTINGS,
});

export const createRoomId = (): string => Date.now().toString();
