import { Issue } from "../../types/issue";
import { Store } from "../../types/room";
import { getVotingStatistics } from "./getStatistics";

export const stopRound = (
  roomId: string,
  store: Store
): { roundIsActive: boolean; issue: Issue, issueId: string } => {
  const room = store[roomId];
  const issueWithStatistics = getVotingStatistics(
    roomId,
    room.currentIssueId as string,
    store
  );

  room.roundIsActive = false;

  return { roundIsActive: room.roundIsActive, issue: issueWithStatistics, issueId: room.currentIssueId };
};
