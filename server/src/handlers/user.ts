import { Server, Socket } from "socket.io";
import {
  addKickVoteArray,
  changeUserStatus,
  getKickingResult,
  notAllUsersHaveVoted,
  userCanNotBeKicked,
  vote,
} from "../actions/user";
import {
  USER_IS_DELETED,
  USER_IS_KICKED,
  USER_IS_NOT_DELETED,
  YOU_ARE_DELETED,
  YOU_ARE_KICKED,
  YOU_ARE_NOT_DELETED,
} from "../events";
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
      socket.emit(USER_IS_KICKED, { userId, user });
      socket.to(userId).emit(YOU_ARE_KICKED, userId);
      socket.to(roomId).except(userId).emit(USER_IS_KICKED, { userId, user });
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

        socket.emit(USER_IS_DELETED, {
          userId: kickedUserId,
          user,
        });
        socket.to(roomId).except(kickedUserId).emit(USER_IS_DELETED, {
          userId: kickedUserId,
          user,
        });

        socket.to(kickedUserId).emit(YOU_ARE_DELETED, {
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
        socket.emit(USER_IS_NOT_DELETED, { userId: kickedUserId, user });
        socket
          .to(roomId)
          .except(kickedUserId)
          .emit(USER_IS_NOT_DELETED, { userId: kickedUserId, user });

        socket
          .to(kickedUserId)
          .emit(YOU_ARE_NOT_DELETED, { userId: kickedUserId, user });
      }
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
