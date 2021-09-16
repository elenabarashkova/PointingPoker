import { DELETE_ISSUE } from 'src/redux/action-types';
import { ResponseStatus, socket } from '../constants';

export const deleteIssue = (roomId: string, issueId: string): Promise<string> => new Promise((resolve, reject) => {
  socket.emit(DELETE_ISSUE, { roomId, issueId }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
