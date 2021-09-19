import { Store } from '../../types/room';

export const deleteIssue = (
  roomId: string,
  issueId: string,
  store: Store
): void => {
  const room = store[roomId];
  const {
    // eslint-disable-next-line no-empty-pattern
    [issueId]: {},
    ...rest
  } = room.issues;

  room.issues = rest;
};
