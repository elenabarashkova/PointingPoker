import { UserData } from 'src/types/user';
import {
  ResponseStatus, ERROR_RESULT, socket, KICKING_VOTE, 
} from '../constants';

export type KickingVoteResultType = typeof ERROR_RESULT | UserData;

export const kickingVoteUser = (
  confirm: boolean, 
  roomId: string, 
  kickedUserId: string,
): Promise<KickingVoteResultType> => (
  new Promise<KickingVoteResultType>((resolve, reject) => {
    socket.emit(KICKING_VOTE, { confirm, roomId, kickedUserId }, ({ status, data, error }) => {
      console.log('ответ от сервера', status);
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }));
