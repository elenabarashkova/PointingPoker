import { GameSettings } from 'src/types/room';
import {
  CHANGE_GAME_SETTINGS, ResponseStatus, socket,
} from '../constants';

export const changeGameSettings = (roomId: string, settings: GameSettings): Promise<GameSettings> => (
  new Promise<GameSettings>((resolve, reject) => {
    socket.emit(CHANGE_GAME_SETTINGS, { roomId, settings }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  })
);
