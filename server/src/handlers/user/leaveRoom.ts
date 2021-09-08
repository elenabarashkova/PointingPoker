import { changeUserStatus } from "../../actions/user/changeStatus";
import { UserEvents } from "../../constants/events";
import { getRoom, handleError } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { UserStatus } from "../../types/user";

export const leaveRoomHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (roomId: string, callback: EventCallback): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const { updatedRoom, updatedUser } = changeUserStatus(
        room,
        socket.id,
        UserStatus.left
      );
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      callback({ status: 200, data: { userId: socket.id, user: updatedUser } });
      socket
        .to(roomId)
        .emit(UserEvents.userLeft, { userId: socket.id, user: updatedUser });
      socket.disconnect();
    } catch {
      handleError(socket, callback);
    }
  };
