import { updateIssue } from "../../actions/issue/update";
import { IssueEvents } from "../../constants/events";
import { getRoom, handleError } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { UpdatedIssueData } from "../../types/data";

export const updateIssueHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, issueId, issue }: UpdatedIssueData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const { updatedIssue, updatedRoom } = updateIssue(room, issueId, issue);
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      callback({ status: 200, data: { issueId, issue: updatedIssue } });
      socket.to(roomId).emit(IssueEvents.issueHasBeenUpdated, {
        issueId,
        issue: updatedIssue,
      });
    } catch {
      handleError(socket, callback);
    }
  };
