import { Store } from '../../types/room';

export const deleteIssue = (
  roomId: string,
  issueId: string,
  store: Store
): boolean => {
  const room = store[roomId];
  const isIssueInRoom = room.issues[issueId] ? true : false;
  const {
    // eslint-disable-next-line no-empty-pattern
    [issueId]: {},
    ...rest
  } = room.issues;

  room.issues = rest;
  return isIssueInRoom;
};
