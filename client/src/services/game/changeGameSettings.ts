import { GameSettings } from 'src/types/room';
import {
  CHANGE_GAME_SETTINGS, ResponseStatus, socket,
} from '../constants';

export const changeGameSettings = (roomId: string, gameSettings: GameSettings): Promise<GameSettings> => (
  new Promise<GameSettings>((resolve, reject) => {
    socket.emit(CHANGE_GAME_SETTINGS, { roomId, gameSettings }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  })
);
