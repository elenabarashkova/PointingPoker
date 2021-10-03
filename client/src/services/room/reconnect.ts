import { Room } from 'src/types/room';
import { User } from 'src/types/user';
import { RECONNECTED, ResponseStatus, socket } from '../constants';

interface UserReconnectingData {
  newUserId: string;
  user: User;
  room: Room;
}

export const reconnect = (
  roomId: string, 
  userId: string,
): Promise<UserReconnectingData> => new Promise<UserReconnectingData>((resolve, reject) => {
  socket.emit(RECONNECTED, { roomId, userId }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(...error));
  });
});
