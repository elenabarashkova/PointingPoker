import { Socket } from 'socket.io';
import { roomExists } from '../../actions/room';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';

export const checkRoomHandler =
  (socket: Socket) =>
  (roomId: string, callback: EventCallback): void => {
    try {
      callback({ status: 200, data: !!roomExists(roomId, store) });
    } catch {
      handleError(socket, callback);
    }
  };
