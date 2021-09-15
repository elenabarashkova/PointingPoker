import { INIT_GAME_SETTINGS } from '../constants/game';
import { GameStatus } from '../types/game';
import { Room, Store } from '../types/room';
import { User, UserRole, UserStatus } from '../types/user';

export const roomExists = (roomId: string, store: Store): boolean =>
  !!store[roomId];

const createRoomId = (store: Store): string => {
  let id = Date.now().toString();
  if (roomExists(id, store)) {
    id = createRoomId(store);
  }
  return id;
};

export const createRoom = (
  userId: string,
  user: User,
  store: Store
): { room: Room; roomId: string } => {
  const roomId = createRoomId(store);
  const room = {
    users: {
      [userId]: {
        ...user,
        role: UserRole.master,
        status: UserStatus.active,
      },
    },
    messages: [],
    issues: {},
    gameStatus: GameStatus.pending,
    gameSettings: INIT_GAME_SETTINGS,
  };

  store[roomId] = room;
  return { room, roomId };
};
