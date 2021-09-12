import { kickUser, userCanNotBeKicked } from '../../actions/user/kick';
import { KickUserEvents } from '../../constants/events';
import { getRoom } from '../../helpers';
import { HandlerParams } from '../../types';
import { UserData } from '../../types/data';

export const kickUserHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async ({ userId, roomId }: UserData): Promise<void> => {
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

      socket.emit(KickUserEvents.userIsKicked, response);
      socket.to(userId).emit(KickUserEvents.youAreKicked, response);
      socket
        .to(roomId)
        .except(userId)
        .emit(KickUserEvents.userIsKicked, response);
    } catch (error) {
      socket.emit('error', { status: 500, message: 'error' });
    }
  };
