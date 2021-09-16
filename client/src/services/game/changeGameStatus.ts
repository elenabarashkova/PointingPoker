import { ChangeGameStatusData } from 'src/types/game';
import { GameStatus } from 'src/types/room';
import {
  CHANGE_GAME_STATUS, ERROR_RESULT, ResponseStatus, socket, 
} from '../constants';

export const changeGameStatus = (roomId: string, gameStatus: keyof typeof GameStatus): Promise<string> => (
  new Promise<string>((resolve, reject) => {
    socket.emit(CHANGE_GAME_STATUS, { roomId, gameStatus }, ({ status, data, error }) => {
      console.log('status', status, 'data', data, 'error', error);
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }));
