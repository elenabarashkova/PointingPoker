import { Room } from "../../types/room";

export const deleteIssue = (room: Room, issueId: string): Room => {
  const {
    // eslint-disable-next-line no-empty-pattern
    [issueId]: {},
    ...rest
  } = room.issues;

  return {
    ...room,
    issues: rest,
  };
};
