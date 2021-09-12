import { ADD_ISSUE } from 'src/redux/action-types';
import { Issue, IssueData } from 'src/types/issues';
import { ResponseStatus, socket } from '../constants';

export const addIssue = (roomId: string, issue: Issue): Promise<IssueData> => new Promise((resolve, reject) => {
  socket.emit(ADD_ISSUE, { roomId, issue }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
