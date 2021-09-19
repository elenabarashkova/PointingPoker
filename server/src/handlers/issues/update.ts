import { Socket } from 'socket.io';
import { updateIssue } from '../../actions/issue/update';
import { IssueEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { UpdatedIssueData } from '../../types/data';

export const updateIssueHandler =
  (socket: Socket) =>
  (
    { roomId, issueId, issue }: UpdatedIssueData,
    callback: EventCallback
  ): void => {
    try {
      const updatedIssue = updateIssue(roomId, issueId, issue, store);
      callback({ status: 200, data: { issueId, issue: updatedIssue } });
      socket.to(roomId).emit(IssueEvents.issueHasBeenUpdated, {
        issueId,
        issue: updatedIssue,
      });
    } catch {
      handleError(socket, callback);
    }
  };
