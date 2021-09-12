import { addIssue } from '../../actions/issue/add';
import { IssueEvents } from '../../constants/events';
import { getRoom, handleError } from '../../helpers';
import { HandlerParams } from '../../types';
import { EventCallback } from '../../types/callbacks';
import { NewIssueData } from '../../types/data';

export const addIssueHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, issue }: NewIssueData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const { issueId, createdIssue, updateRoom } = addIssue(room, issue);
      await redisSetAsync(roomId, JSON.stringify(updateRoom));
      callback({ status: 200, data: { issueId, issue: createdIssue } });
      socket
        .to(roomId)
        .emit(IssueEvents.issueHasBeenAdded, { issueId, issue: createdIssue });
    } catch {
      handleError(socket, callback);
    }
  };
