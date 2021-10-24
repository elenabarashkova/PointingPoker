import { Server, Socket } from 'socket.io';
import { changeUserStatus } from '../../actions/user/changeStatus';
import { KickUserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { UserData } from '../../types/data';
import { UserStatus } from '../../types/user';

export const deleteUserHandler =
  (io: Server, socket: Socket) =>
  ({ userId, roomId }: UserData, callback: EventCallback): void => {
    try {
      const updatedUser = changeUserStatus(
        roomId,
        userId,
        UserStatus.deleted,
        store
      );
      callback({ status: 200, data: { userId, user: updatedUser } });
      socket.to(userId).emit(KickUserEvents.youAreDeleted, userId);
      socket
        .to(roomId)
        .except(userId)
        .emit(KickUserEvents.userIsDeleted, { userId, user: updatedUser });
      io.in(userId).socketsLeave(roomId);
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
