import { UPDATE_ISSUE } from 'src/redux/action-types';
import { Issue, IssueData } from 'src/types/issues';
import { ResponseStatus, socket } from '../constants';

export const updateIssue = (
  roomId: string,
  issueId: string,
  issue: Issue,
): Promise<IssueData> => new Promise((resolve, reject) => {
  socket.emit(UPDATE_ISSUE, { roomId, issueId, issue }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
