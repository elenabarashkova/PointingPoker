import { Issue, IssueData } from 'src/types/issues';
import { Events, ResponseStatus, socket } from '../constants';

export const addIssue = (roomId: string, issue: Issue): Promise<IssueData> => new Promise((resolve, reject) => {
  socket.emit(Events.addIssue, { roomId, issue }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
