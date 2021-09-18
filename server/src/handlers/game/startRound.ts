import { Socket } from 'socket.io';
import { startRound } from '../../actions/game/startRound';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameVotingData } from '../../types/data';

export const startRoundHandler =
  (socket: Socket) =>
  ({ roomId, issueId }: GameVotingData, callback: EventCallback): void => {
    try {
      const currentRound = startRound(roomId, issueId, store);
      callback({
        status: 200,
        data: { currentRound },
      });
      socket.to(roomId).emit(GameEvents.roundIsStarted, currentRound);
    } catch {
      handleError(socket, callback);
    }
  };
