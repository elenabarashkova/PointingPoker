import { Server, Socket } from 'socket.io';
import { addUser } from '../../actions/user/addUser';
import { RoomEvents, UserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { AccessData } from '../../types/data';

export const accessConfirmationHandler =
  (io: Server, socket: Socket) =>
  (
    { roomId, user, userId, confirmation }: AccessData,
    callback: EventCallback
  ): void => {
    try {
      if (confirmation) {
        const { room, joinedUser } = addUser(roomId, userId, user, store);

        io.in(userId).socketsJoin(roomId);
        socket.to(userId).emit(RoomEvents.accessConfirmationResponse, {
          room,
          roomId,
          userId,
          confirmation,
        });
        socket.to(roomId).except(userId).emit(UserEvents.userConnected, {
          userId,
          user: joinedUser,
        });
        callback({
          status: 200,
          data: {
            message: 'Your confirmation is accepted',
            userId,
            user: joinedUser,
          },
        });
      } else {
        socket.to(userId).emit(RoomEvents.accessConfirmationResponse, {
          confirmation,
        });
        callback({
          status: 200,
          data: { message: 'Your confirmation is accepted' },
        });
      }
    } catch {
      handleError(socket, callback);
    }
  };
