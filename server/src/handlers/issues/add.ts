import { Socket } from 'socket.io';
import { addIssue } from '../../actions/issue/add';
import { IssueEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { NewIssueData } from '../../types/data';

export const addIssueHandler =
  (socket: Socket) =>
  ({ roomId, issue }: NewIssueData, callback: EventCallback): void => {
    try {
      const { issueId, createdIssue } = addIssue(roomId, issue, store);
      callback({ status: 200, data: { issueId, issue: createdIssue } });
      socket
        .to(roomId)
        .emit(IssueEvents.issueHasBeenAdded, { issueId, issue: createdIssue });
    } catch {
      handleError(socket, callback);
    }
  };
