import { GameStatus } from '../../types/game';
import { Store } from '../../types/room';

export const changeGameStatus = (
  roomId: string,
  gameStatus: keyof typeof GameStatus,
  store: Store
): void => {
  const room = store[roomId];
  room.gameStatus = gameStatus;
};
