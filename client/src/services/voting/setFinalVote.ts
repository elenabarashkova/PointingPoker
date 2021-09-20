import { FinalVoteData } from 'src/types/voting';
import { Events, ResponseStatus, socket } from '../constants';

export const setFinalVote = (
  roomId: string,
  issueId: string,
  finalVote: string,
): Promise<FinalVoteData> => new Promise((resolve, reject) => {
  socket.emit(Events.setFinalVote, { roomId, issueId, finalVote }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});
