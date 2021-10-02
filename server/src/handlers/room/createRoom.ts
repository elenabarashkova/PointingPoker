import { Socket } from 'socket.io';
import { createRoom } from '../../actions/room';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { User } from '../../types/user';

export const createRoomHandler =
  (socket: Socket) =>
  (user: User, callback: EventCallback): void => {
    try {
      const { room, roomId } = createRoom(socket.id, user, store);
      socket.join(roomId);
      callback({ status: 200, data: { room, roomId } });
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
