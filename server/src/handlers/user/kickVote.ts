import { Server } from 'socket.io';
import { getVoteResults } from '../../actions/user/vote';
import { KickUserEvents } from '../../constants/events';
import { getRoom } from '../../helpers';
import { HandlerParams } from '../../types';
import { VotingData } from '../../types/data';

export const kickUserVotingHandler =
  (io: Server, { socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async ({ confirm, roomId, kickedUserId }: VotingData): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const { updatedUser, updatedRoom, votingIsNotFinished, userWasKicked } =
        getVoteResults(room, socket.id, kickedUserId, confirm);

      await redisSetAsync(roomId, JSON.stringify(updatedRoom));

      if (votingIsNotFinished) {
        return;
      }

      const kickUserData = {
        userId: kickedUserId,
        user: updatedUser,
      };

      const event = userWasKicked
        ? KickUserEvents.userIsDeleted
        : KickUserEvents.userIsNotDeleted;

      socket.emit(event, kickUserData);
      socket.to(roomId).except(kickedUserId).emit(event, kickUserData);
      socket.to(kickedUserId).emit(event, kickUserData);

      if (userWasKicked) {
        io.to(kickedUserId).disconnectSockets();
      }
    } catch {
      socket.emit('error', { status: 500, message: 'error' });
    }
  };
