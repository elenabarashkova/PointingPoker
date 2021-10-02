import { Socket } from 'socket.io';
import { admissionNeeded, roomExists } from '../../actions/room';
import { addUser } from '../../actions/user/addUser';
import { RoomEvents, UserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { NewUserData } from '../../types/data';
import { Store } from '../../types/room';
import { User } from '../../types/user';

const confirmAccessToRoom = (
  socket: Socket,
  roomId: string,
  userId: string,
  user: User,
  store: Store
) => {
  const { masterId } = store[roomId];
  socket.to(masterId).emit(RoomEvents.confirmAccess, {
    userId,
    user,
  });
};

export const joinRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: NewUserData, callback: EventCallback): void => {
    try {
      if (admissionNeeded(roomId, store)) {
        confirmAccessToRoom(socket, roomId, socket.id, user, store);
        callback({
          status: 202,
          data: 'Your request to join the room has been accepted',
        });
      } else if (roomExists(roomId, store)) {
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
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
