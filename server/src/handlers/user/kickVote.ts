import { Server, Socket } from 'socket.io';
import { changeUserStatus } from '../../actions/user/changeStatus';
import { getVoteResults } from '../../actions/user/vote';
import { KickUserEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { VotingData } from '../../types/data';
import { UserStatus } from '../../types/user';

export const kickUserVotingHandler =
  (io: Server, socket: Socket) =>
  (
    { confirm, roomId, kickedUserId }: VotingData,
    callback: EventCallback
  ): void => {
    try {
      const { updatedUser, votingIsNotFinished, userWasKicked } =
        getVoteResults(roomId, socket.id, kickedUserId, confirm, store);

      if (updatedUser) {
        callback({ status: 200, data: 'Your vote is accepted' });
      }

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

      const kickedUserEvent = userWasKicked
        ? KickUserEvents.youAreDeleted
        : KickUserEvents.youAreNotDeleted;

      socket.emit(event, kickUserData);
      socket.to(roomId).except(kickedUserId).emit(event, kickUserData);
      socket.to(kickedUserId).emit(kickedUserEvent, kickUserData);

      if (userWasKicked) {
        io.to(kickedUserId).disconnectSockets();
      }
    } catch {
      handleError(socket, callback);
      const response = {
        status: 500,
        message: 'Voting error, user is not deleted',
      };
      socket.emit(KickUserEvents.KICK_VOTING_ERROR, response);
      socket.to(roomId).emit(KickUserEvents.KICK_VOTING_ERROR, response);
      if (store[roomId] && store[roomId].users[kickedUserId]) {
        changeUserStatus(roomId, kickedUserId, UserStatus.active, store);
      }
    }
  };
