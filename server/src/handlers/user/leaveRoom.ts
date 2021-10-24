import { Server, Socket } from 'socket.io';
import { changeUserStatus } from '../../actions/user/changeStatus';
import { UserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { UserStatus } from '../../types/user';

export const leaveRoomHandler =
  (io: Server, socket: Socket) =>
  (roomId: string, callback: EventCallback): void => {
    try {
      const updatedUser = changeUserStatus(
        roomId,
        socket.id,
        UserStatus.left,
        store
      );
      callback({ status: 200, data: { userId: socket.id, user: updatedUser } });
      socket
        .to(roomId)
        .emit(UserEvents.userLeft, { userId: socket.id, user: updatedUser });
        io.in(socket.id).socketsLeave(roomId);
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
