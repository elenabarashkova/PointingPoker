import { GameSettings } from '../../types/game';
import { Store } from '../../types/room';

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
