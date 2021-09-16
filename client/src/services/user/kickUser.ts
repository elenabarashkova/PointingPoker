import { KickUserdata } from 'src/types/user';
import {
  ResponseStatus, ERROR_RESULT, socket, KICK_USER, 
} from '../constants';

export type KickUserResultType = typeof ERROR_RESULT | KickUserdata;

export const kickUser = (userId: string, roomId: string): Promise<KickUserResultType> => (
  new Promise<KickUserResultType>((resolve, reject) => {
    socket.emit(KICK_USER, { userId, roomId }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }));
