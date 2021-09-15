import { Socket } from 'socket.io';
import { roomExists } from '../../actions/room';
import { addUser } from '../../actions/user/addUser';
import { UserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { NewUserData } from '../../types/data';

export const joinRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: NewUserData, callback: EventCallback): void => {
    try {
      if (roomExists(roomId, store)) {
        const { room, joinedUser } = addUser(roomId, socket.id, user, store);
        callback({
          status: 200,
          data: { room, roomId, userId: socket.id },
        });
        socket.join(roomId);
        socket.to(roomId).emit(UserEvents.userConnected, {
          userId: socket.id,
          user: joinedUser,
        });
      } else {
        callback({ status: 404, data: 'Room not found' });
        socket.disconnect();
      }
    } catch {
      handleError(socket, callback);
    }
  };
