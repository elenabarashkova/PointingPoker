import { Issue } from "../../types/issue";
import { Room } from "../../types/room";

export const updateIssue = (
  room: Room,
  issueId: string,
  issue: Issue
): { updatedIssue: Issue; updatedRoom: Room } => {
  const updatedIssue = { ...room.issues[issueId], ...issue };
  const updatedRoom = {
    ...room,
    issue: { ...room.issues, [issueId]: updatedIssue },
  };

  return { updatedIssue, updatedRoom };
};
