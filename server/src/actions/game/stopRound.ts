import { Issue } from '../../types/issue';
import { Store } from '../../types/room';
import { getVotingStatistics } from './getStatistics';

export const stopRound = (
  roomId: string,
  store: Store
): { currentRound: null; issue: Issue } => {
  const room = store[roomId];
  const issueWithStatistics = getVotingStatistics(
    roomId,
    room.currentRound?.issueId as string,
    store
  );

  room.currentRound = null;

  return { currentRound: null, issue: issueWithStatistics };
};
