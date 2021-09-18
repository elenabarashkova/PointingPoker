import { Socket } from 'socket.io';
import { createRoom, roomExists } from '../actions/room';
import { handleError } from '../helpers';
import { store } from '../store';
import { EventCallback } from '../types/callbacks';
import { User } from '../types/user';

export const createRoomHandler =
  (socket: Socket) =>
  (user: User, callback: EventCallback): void => {
    try {
      const { room, roomId } = createRoom(socket.id, user, store);
      socket.join(roomId);
      callback({ status: 200, data: { room, roomId } });
    } catch {
      handleError(socket, callback);
    }
  };

export const checkRoomHandler =
  (socket: Socket) =>
  (roomId: string, callback: EventCallback): void => {
    try {
      callback({ status: 200, data: !!roomExists(roomId, store) });
    } catch {
      handleError(socket, callback);
    }
  };
