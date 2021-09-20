import { GameStatus } from 'src/types/room';
import {
  CHANGE_GAME_STATUS, ResponseStatus, socket, 
} from '../constants';

export const changeGameStatus = (roomId: string, gameStatus: keyof typeof GameStatus): Promise<string> => (
  new Promise<string>((resolve, reject) => {
    socket.emit(CHANGE_GAME_STATUS, { roomId, gameStatus }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }));
