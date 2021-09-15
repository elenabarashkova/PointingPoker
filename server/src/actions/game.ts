import { GameSettings, GameStatus } from '../types/game';
import { Store } from '../types/room';

export const changeGameSettings = (
  roomId: string,
  settings: GameSettings,
  store: Store
): GameSettings => {
  const room = store[roomId];
  const updatedSettings = { ...room.gameSettings, ...settings };
  room.gameSettings = { ...room.gameSettings, ...updatedSettings };
  return updatedSettings;
};

export const changeGameStatus = (
  roomId: string,
  gameStatus: keyof typeof GameStatus,
  store: Store
): void => {
  const room = store[roomId];
  room.gameStatus = gameStatus;
};
