import { kickUser, userCanNotBeKicked } from '../../actions/user/kick';
import { KickUserEvents } from '../../constants/events';
import { getRoom, handleError } from '../../helpers';
import { HandlerParams } from '../../types';
import { EventCallback } from '../../types/callbacks';
import { UserData } from '../../types/data';

export const kickUserHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { userId, roomId }: UserData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      if (userCanNotBeKicked(socket.id, userId, room)) {
        return;
      }
      const { updatedRoom, kickedUser } = kickUser(room, userId);
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));

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
    } catch (error) {
      handleError(socket, callback);
    }
  };
