import { Socket } from "socket.io";
import { changeUserStatus } from "../actions/user";
import { KICKED_FROM_ROOM, USER_KICKED } from "../events";
import { store } from "../store";
import { UserData } from "../types/data";
import { UserStatus } from "../types/user";

export const kickUserHandler =
  (socket: Socket) =>
  ({ userId, roomId }: UserData): void => {
    try {
      changeUserStatus(store, roomId, userId, UserStatus.kicked);
      socket.emit(KICKED_FROM_ROOM, userId);
      socket.to(roomId).emit(USER_KICKED, userId);
    } catch (error) {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
