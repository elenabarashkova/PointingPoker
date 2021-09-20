import { UserVotingData } from 'src/types/voting';
import { ISSUE_VOTE, ResponseStatus, socket } from '../constants';

export const sendVote = (roomId: string, issueId: string, vote: string): Promise<UserVotingData> => new Promise<UserVotingData>((resolve, reject) => {
  socket.emit(ISSUE_VOTE, { roomId, issueId, vote }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(error);
  });
});
