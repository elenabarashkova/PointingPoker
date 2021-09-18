import { UserData } from 'src/types/user';
import { LEAVE_ROOM, ResponseStatus, socket } from '../constants';

export const leaveRoom = (roomId: string): Promise<UserData> => (
  new Promise<UserData>((resolve, reject) => {
    socket.emit(LEAVE_ROOM, roomId, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }));
