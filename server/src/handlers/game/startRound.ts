import { Socket } from 'socket.io';
import { startRound } from '../../actions/game/startRound';
import { setActiveIssue } from '../../actions/issue/activateIssue';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameVotingData } from '../../types/data';

export const startRoundHandler =
  (socket: Socket) =>
  ({ roomId, issueId }: GameVotingData, callback: EventCallback): void => {
    try {
      const { roundIsActive, currentIssueId } = startRound(
        roomId,
        issueId,
        store
      );
      const issues = setActiveIssue(roomId, issueId, store);
      callback({
        status: 200,
        data: { currentIssueId, issues, roundIsActive },
      });
      socket
        .to(roomId)
        .emit(GameEvents.roundIsStarted, {
          currentIssueId,
          issues,
          roundIsActive,
        });
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
