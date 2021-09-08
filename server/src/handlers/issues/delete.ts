import { deleteIssue } from "../../actions/issue/delete";
import { IssueEvents } from "../../constants/events";
import { getRoom, handleError } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { IssueData } from "../../types/data";

export const deleteIssueHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, issueId }: IssueData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const updateRoom = deleteIssue(room, issueId);
      await redisSetAsync(roomId, JSON.stringify(updateRoom));
      callback({ status: 200, data: issueId });
      socket.to(roomId).emit(IssueEvents.issueHasBeenDeleted, issueId);
    } catch {
      handleError(socket, callback);
    }
  };
