import { Socket } from 'socket.io';
import { addFinalVote } from '../../actions/game/addFinalVote';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameData } from '../../types/data';

export const setFinalVoteHandler =
  (socket: Socket) =>
  ({ roomId, issueId, finalVote }: GameData, callback: EventCallback): void => {
    try {
      addFinalVote(roomId, issueId, finalVote as string, store);
      callback({
        status: 200,
        data: { issueId, finalVote},
      });
      socket.to(roomId).emit(GameEvents.finalVote, { issueId, finalVote});
    } catch {
      handleError(socket, callback);
    }
  };
