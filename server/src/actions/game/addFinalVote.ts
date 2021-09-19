import { Store } from '../../types/room';

export const addFinalVote = (
  roomId: string,
  issueId: string,
  finalVote: string,
  store: Store
): void => {
  const room = store[roomId];
  const issue = room.issues[issueId];
  const updatedIssue = { ...issue, finalVote };
  room.issues = { ...room.issues, [issueId]: updatedIssue };
};
