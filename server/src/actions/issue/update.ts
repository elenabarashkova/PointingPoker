import { Issue } from '../../types/issue';
import { Store } from '../../types/room';

export const updateIssue = (
  roomId: string,
  issueId: string,
  issue: Issue,
  store: Store
): Issue => {
  const room = store[roomId];
  const updatedIssue = { ...room.issues[issueId], ...issue };
  room.issues = { ...room.issues, [issueId]: updatedIssue };
  return updatedIssue;
};
