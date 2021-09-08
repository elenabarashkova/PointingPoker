import { kickUser, userCanNotBeKicked } from "../../actions/user/kick";
import { KickUserEvents } from "../../constants/events";
import { getRoom } from "../../helpers";
import { HandlerParams } from "../../types";
import { UserData } from "../../types/data";

export const kickUserHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async ({ userId, roomId }: UserData): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      if (userCanNotBeKicked(socket.id, userId, room)) {
        return;
      }
      const { updatedRoom, updatedUser } = kickUser(room, userId);
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      socket.emit(KickUserEvents.userIsKicked, { userId, user: updatedUser });
      socket.to(userId).emit(KickUserEvents.youAreKicked, userId);
      socket
        .to(roomId)
        .except(userId)
        .emit(KickUserEvents.userIsKicked, { userId, user: updatedUser });
    } catch (error) {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

// export const disconnectingUserHandler = (socket: Socket) => (): void => {
//   const [userId, roomId] = Array.from(socket.rooms);
//   addDisconnectStatus(store, roomId, userId);
//   console.log(store[roomId].users[userId]);
// };
