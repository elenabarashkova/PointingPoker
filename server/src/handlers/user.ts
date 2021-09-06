import { Server, Socket } from "socket.io";
import {
  addKickVoteArray,
  changeUserStatus,
  getKickingResult,
  notAllUsersHaveVoted,
  userCanNotBeKicked,
  vote,
} from "../actions/user";
import { KickUserEvents } from "../constants/events";
import { store } from "../store";
import { UserData, VotingData } from "../types/data";
import { UserStatus } from "../types/user";

export const kickUserHandler =
  (socket: Socket) =>
  ({ userId, roomId }: UserData): void => {
    try {
      if (userCanNotBeKicked(socket.id, userId, roomId, store)) {
        return;
      }
      const user = changeUserStatus(store, roomId, userId, UserStatus.kicked);
      addKickVoteArray(store, roomId, userId);
      socket.emit(KickUserEvents.userIsKicked, { userId, user });
      socket.to(userId).emit(KickUserEvents.youAreKicked, userId);
      socket
        .to(roomId)
        .except(userId)
        .emit(KickUserEvents.userIsKicked, { userId, user });
    } catch (error) {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

export const kickUserVotingHandler =
  (socket: Socket, io: Server) =>
  ({ confirm, roomId, kickedUserId }: VotingData): void => {
    try {
      vote(store, roomId, socket.id, kickedUserId, confirm);

      if (notAllUsersHaveVoted(store, roomId, kickedUserId)) {
        return;
      }

      const kickResult = getKickingResult(store, roomId, kickedUserId);

      if (kickResult) {
        const user = changeUserStatus(
          store,
          roomId,
          kickedUserId,
          UserStatus.deleted
        );

        socket.emit(KickUserEvents.userIsDeleted, {
          userId: kickedUserId,
          user,
        });
        socket
          .to(roomId)
          .except(kickedUserId)
          .emit(KickUserEvents.userIsDeleted, {
            userId: kickedUserId,
            user,
          });

        socket.to(kickedUserId).emit(KickUserEvents.youAreDeleted, {
          userId: kickedUserId,
          user,
        });
        io.to(kickedUserId).disconnectSockets();
      } else {
        const user = changeUserStatus(
          store,
          roomId,
          kickedUserId,
          UserStatus.active
        );
        socket.emit(KickUserEvents.userIsNotDeleted, {
          userId: kickedUserId,
          user,
        });
        socket
          .to(roomId)
          .except(kickedUserId)
          .emit(KickUserEvents.userIsNotDeleted, {
            userId: kickedUserId,
            user,
          });

        socket.to(kickedUserId).emit(KickUserEvents.youAreNotDeleted, {
          userId: kickedUserId,
          user,
        });
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
