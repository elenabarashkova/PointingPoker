import { getIssueId } from '../../helpers';
import { Issue, IssueStatus } from '../../types/issue';
import { Store } from '../../types/room';

export const addIssue = (
  roomId: string,
  issue: Issue,
  store: Store
): { issueId: string; createdIssue: Issue } => {
  const room = store[roomId];
  const issueId = getIssueId(room.issues);
  const createdIssue = { ...issue, status: IssueStatus.pending };
  room.issues = { ...room.issues, [issueId]: createdIssue };
  return { issueId, createdIssue };
};
