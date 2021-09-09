import { RoomData } from 'src/types/room';
import { User } from 'src/types/user';
import { JOIN_ROOM, ResponseStatus, socket } from './constants';

export const joinRoom = (roomId: string, user: User): Promise<RoomData> => (
  new Promise<RoomData>((resolve, reject) => {
    socket.emit(JOIN_ROOM, { roomId, user }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      if (status === ResponseStatus.notFound) {
        // todo: показать сообщение
        alert('комната не найдена');
      }
      reject(error);
    });
    // todo: показать сообщение
  }).catch((error) => error));
