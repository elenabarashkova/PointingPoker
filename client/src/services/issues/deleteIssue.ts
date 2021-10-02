import { Events, ResponseStatus, socket } from '../constants';

export const deleteIssue = (
  roomId: string,
  issueId: string,
): Promise<{ status: number; data: string }> => new Promise((resolve, reject) => {
  socket.emit(Events.deleteIssue, { roomId, issueId }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok || status === ResponseStatus.notFound) {
      resolve({ status, data });
      return;
    }
    reject(new Error(error));
  });
});
