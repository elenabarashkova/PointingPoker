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
      const isDeleted = deleteIssue(roomId, issueId, store);
      if (isDeleted) {
        callback({ status: 200, data: issueId });
        socket.to(roomId).emit(IssueEvents.issueHasBeenDeleted, issueId);
      } else {
        callback({ status: 404, data: 'Issue not found' });
      }
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
