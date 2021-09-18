import { Events, ResponseStatus, socket } from '../constants';

export const deleteIssue = (roomId: string, issueId: string): Promise<string> => new Promise((resolve, reject) => {
  socket.emit(Events.deleteIssue, { roomId, issueId }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
