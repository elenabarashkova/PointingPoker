import { Server } from "socket.io";
import {
  getVoteResults,
  kickUser,
  userCanNotBeKicked,
} from "../actions/user/kickUser";
import { KickUserEvents } from "../constants/events";
import { HandlerParams } from "../types";
import { UserData, VotingData } from "../types/data";

export const kickUserHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async ({ userId, roomId }: UserData): Promise<void> => {
    try {
      const roomStr = await redisGetAsync(roomId);
      const room = JSON.parse(roomStr as string);
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

export const kickUserVotingHandler =
  (io: Server, { socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async ({ confirm, roomId, kickedUserId }: VotingData): Promise<void> => {
    try {
      const roomStr = await redisGetAsync(roomId);
      const room = JSON.parse(roomStr as string);
      const { updatedUser, updatedRoom, votingIsNotFinished, userWasKicked } =
        getVoteResults(room, socket.id, kickedUserId, confirm);

      await redisSetAsync(roomId, JSON.stringify(updatedRoom));

      if (votingIsNotFinished) {
        return;
      }

      const kickUserData = {
        userId: kickedUserId,
        user: updatedUser,
      };

      if (userWasKicked) {
        socket.emit(KickUserEvents.userIsDeleted, kickUserData);
        socket
          .to(roomId)
          .except(kickedUserId)
          .emit(KickUserEvents.userIsDeleted, kickUserData);
        socket
          .to(kickedUserId)
          .emit(KickUserEvents.youAreDeleted, kickUserData);

        io.to(kickedUserId).disconnectSockets();
      } else {
        socket.emit(KickUserEvents.userIsNotDeleted, kickUserData);
        socket
          .to(roomId)
          .except(kickedUserId)
          .emit(KickUserEvents.userIsNotDeleted, kickUserData);
        socket
          .to(kickedUserId)
          .emit(KickUserEvents.youAreNotDeleted, kickUserData);
      }
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

// export const disconnectingUserHandler = (socket: Socket) => (): void => {
//   const [userId, roomId] = Array.from(socket.rooms);
//   addDisconnectStatus(store, roomId, userId);
//   console.log(store[roomId].users[userId]);
// };
