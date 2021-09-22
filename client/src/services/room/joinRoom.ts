import { RoomData } from 'src/types/room';
import { User } from 'src/types/user';
import { JOIN_ROOM, ResponseStatus, socket } from '../constants';

export const joinRoom = (
  roomId: string, 
  user: User,
): Promise<RoomData | string> => new Promise<RoomData>((resolve, reject) => {
  socket.emit(JOIN_ROOM, { roomId, user }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok 
      || status === ResponseStatus.admit 
      || status === ResponseStatus.notFound) {
      resolve(data);
      return;
    }
    reject(error);
  });
});
