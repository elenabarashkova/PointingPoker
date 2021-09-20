import { Issues, IssueStatus } from '../../types/issue';
import { Store } from '../../types/room';

export const setActiveIssue = (
  roomId: string,
  activeIssueId: string,
  store: Store
): Issues => {
  const room = store[roomId];
  const activeIssue = {
    ...room.issues[activeIssueId],
    status: IssueStatus.active,
    votes: [],
  };

  const {issues }= room;
  const prevActiveIssue = Object.entries(issues).find(([ , {status}]) => status === IssueStatus.active);
  if(prevActiveIssue) {
    const [id] = prevActiveIssue;
    room.issues[id] = {...room.issues[id], status: IssueStatus.pending}
  }
  room.issues = { ...room.issues, [activeIssueId]: activeIssue };
  return room.issues;
};
