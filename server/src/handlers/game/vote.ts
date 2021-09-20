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
      addVote(roomId, socket.id, issueId, vote, store);
      callback({
        status: 200,
        data: { issueId, userId: socket.id, vote },
      });
      socket.to(roomId).emit(GameEvents.userHasVoted, { issueId, userId: socket.id, vote });
    } catch {
      handleError(socket, callback);
    }
  };
