import { Socket } from 'socket.io';
import { activateIssue } from '../../actions/voting/activateIssue';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameData } from '../../types/data';

export const activateIssueHandler =
  (socket: Socket) =>
  ({ roomId, issueId }: GameData, callback: EventCallback): void => {
    try {
      const issue = activateIssue(roomId, issueId, store);
      callback({
        status: 200,
        data: { issueId, issue },
      });
      socket.to(roomId).emit(GameEvents.issueIsActive, {
        issueId,
        issue,
      });
    } catch {
      handleError(socket, callback);
    }
  };
