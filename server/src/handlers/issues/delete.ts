import { Socket } from 'socket.io';
import { deleteIssue } from '../../actions/issue/delete';
import { IssueEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { IssueData } from '../../types/data';

export const deleteIssueHandler =
  (socket: Socket) =>
  ({ roomId, issueId }: IssueData, callback: EventCallback): void => {
    try {
      deleteIssue(roomId, issueId, store);
      callback({ status: 200, data: issueId });
      socket.to(roomId).emit(IssueEvents.issueHasBeenDeleted, issueId);
    } catch {
      handleError(socket, callback);
    }
  };
