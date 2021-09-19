import { Issue, IssueStatistics } from '../../types/issue';
import { Store } from '../../types/room';

export const getVotingStatistics = (
  roomId: string,
  issueId: string,
  store: Store
): Issue => {
  const room = store[roomId];
  const activeIssue = room.issues[issueId];
  const voteArray = activeIssue.vote;
  const statistics: IssueStatistics = {};
  const totalVoters = voteArray?.length;

  voteArray?.forEach(({ vote }) => {
    const currentVote = statistics[vote];
    statistics[vote] = currentVote
      ? {
          votersAmount: currentVote.votersAmount + 1,
          percentage: (currentVote.votersAmount + 1) / (totalVoters as number),
        }
      : { votersAmount: 1, percentage: 1 / (totalVoters as number) };
  });

  const updatedIssue = { ...activeIssue, statistics };
  room.issues = { ...room.issues, [issueId]: updatedIssue };
  return updatedIssue;
};
