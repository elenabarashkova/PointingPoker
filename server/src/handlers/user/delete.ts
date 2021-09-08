import { changeUserStatus } from "../../actions/user/changeStatus";
import { KickUserEvents } from "../../constants/events";
import { getRoom } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { UserData } from "../../types/data";
import { UserStatus } from "../../types/user";

export const deleteUserHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { userId, roomId }: UserData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const { updatedRoom, updatedUser } = changeUserStatus(
        room,
        userId,
        UserStatus.deleted
      );
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      callback({ status: 200, data: { userId, user: updatedUser } });
      socket.to(userId).emit(KickUserEvents.youAreDeleted, userId);
      socket
        .to(roomId)
        .except(userId)
        .emit(KickUserEvents.userIsDeleted, { userId, user: updatedUser });
    } catch (error) {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
