import { Issue, IssueData } from 'src/types/issues';
import { Events, ResponseStatus, socket } from '../constants';

export const activateIssue = (roomId: string, issueId: string, issue: Issue): Promise<IssueData> => new Promise((resolve, reject) => {
  socket.emit(Events.activateIssue, { roomId, issueId, issue }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
