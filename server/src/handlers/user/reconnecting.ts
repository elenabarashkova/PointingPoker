import { Socket } from 'socket.io';
import { reconnectUser } from '../../actions/user/reconnect';
import { UserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { UserData } from '../../types/data';

export const userReconnectingHandler =
  (socket: Socket) =>
  ({ roomId, userId }: UserData, callback: EventCallback): void => {
    try {
      const { room, updatedUser } = reconnectUser(
        roomId,
        socket.id,
        userId,
        store
      );
      callback({
        status: 200,
        data: { room, newUserId: socket.id, user: updatedUser },
      });
      socket.to(roomId).emit(UserEvents.userReconnected, {
        newUserId: socket.id,
        user: updatedUser,
        messages: room.messages,
        room,
      });
      socket.join(roomId);
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
