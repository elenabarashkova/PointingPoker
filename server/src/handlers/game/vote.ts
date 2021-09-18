import { Socket } from 'socket.io';
import { addVote } from '../../actions/game/addVote';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameVotingData } from '../../types/data';

export const voteHandler =
  (socket: Socket) =>
  (
    { roomId, issueId, vote }: GameVotingData,
    callback: EventCallback
  ): void => {
    try {
      const issue = addVote(roomId, socket.id, issueId, vote, store);
      callback({
        status: 200,
        data: { issueId, issue },
      });
      socket.to(roomId).emit(GameEvents.userHasVoted, {
        issueId,
        issue,
      });
    } catch {
      handleError(socket, callback);
    }
  };
