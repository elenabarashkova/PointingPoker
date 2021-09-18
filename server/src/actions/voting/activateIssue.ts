import { Issue, IssueStatus } from '../../types/issue';
import { Store } from '../../types/room';

export const activateIssue = (
  roomId: string,
  activeIssueId: string,
  store: Store
): Issue => {
  const room = store[roomId];
  const activeIssue = {
    ...room.issues[activeIssueId],
    status: IssueStatus.active,
    vote: [],
  };
  room.issues = { ...room.issues, [activeIssueId]: activeIssue };
  return activeIssue;
};
