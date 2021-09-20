import { IssueVote } from '../../types/issue';
import { Store } from '../../types/room';

export const addVote = (
  roomId: string,
  userId: string,
  issueId: string,
  vote: string,
  store: Store
): void => {
  const room = store[roomId];
  const issue = {
    ...room.issues[issueId],
    vote: [...(room.issues[issueId].votes as IssueVote[]), { vote, userId }],
  };

  room.issues = { ...room.issues, [issueId]: issue };
};
