import { UserData } from 'src/types/user';
import {
  ERROR_RESULT, KICKING_VOTE, ResponseStatus, socket, 
} from '../constants';

export type KickingVoteResultType = typeof ERROR_RESULT | UserData;

export const kickingVoteUser = (
  confirm: boolean,
  roomId: string,
  kickedUserId: string,
): Promise<KickingVoteResultType> => new Promise<KickingVoteResultType>((resolve, reject) => {
  socket.emit(KICKING_VOTE, { confirm, roomId, kickedUserId }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
