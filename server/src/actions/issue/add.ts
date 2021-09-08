import { getIssueId } from "../../helpers";
import { Issue, IssueStatus } from "../../types/issue";
import { Room } from "../../types/room";

export const addIssue = (
  room: Room,
  issue: Issue
): { issueId: string; createdIssue: Issue; updateRoom: Room } => {
  const issueId = getIssueId(room.issues);
  const createdIssue = { ...issue, status: IssueStatus.pending };
  const updateRoom = {
    ...room,
    issues: { ...room.issues, [issueId]: createdIssue },
  };

  return { issueId, createdIssue, updateRoom };
};
