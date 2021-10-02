import { Socket } from 'socket.io';
import { kickUser, userCanNotBeKicked } from '../../actions/user/kick';
import { KickUserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { UserData } from '../../types/data';

export const kickUserHandler =
  (socket: Socket) =>
  ({ userId, roomId }: UserData, callback: EventCallback): void => {
    try {
      if (userCanNotBeKicked(socket.id, userId, roomId, store)) {
        callback({ status: 403, data: 'User can not be kicked' });
        return;
      }
      const kickedUser = kickUser(roomId, socket.id, userId, store);
      const response = {
        kickInitiator: socket.id,
        kickedUserId: userId,
        kickedUser,
      };
      callback({ status: 200, data: { kickedUserId: userId, kickedUser } });
      socket.to(userId).emit(KickUserEvents.youAreKicked, response);
      socket
        .to(roomId)
        .except(userId)
        .emit(KickUserEvents.userIsKicked, response);
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
