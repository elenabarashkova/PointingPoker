import { Socket } from "socket.io";
import { createRoom, createRoomId } from "../actions/room";
import { addUser, changeUserStatus } from "../actions/user";
import {
  JOINED_ROOM,
  LEFT_ROOM,
  ROOM_NOT_FOUND,
  ROOM_WAS_CREATED,
  USER_CONNECTED,
  USER_LEFT,
} from "../events";
import { store } from "../store";
import { ConnectionData } from "../types/data";
import { User, UserRole, UserStatus } from "../types/user";

export const createRoomHandler =
  (socket: Socket) =>
  (user: User): void => {
    try {
      const roomId = createRoomId(store);
      createRoom(store, roomId);
      addUser(store, roomId, socket.id, {
        ...user,
        role: UserRole.master,
      });
      socket.join(roomId);
      socket.emit(ROOM_WAS_CREATED, { room: store[roomId], roomId });
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

export const joinRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: ConnectionData): void => {
    try {
      if (store[roomId]) {
        const joinedUser = addUser(store, roomId, socket.id, user);
        socket.join(roomId);
        socket.emit(JOINED_ROOM, { room: store[roomId], roomId });
        socket
          .to(roomId)
          .emit(USER_CONNECTED, { userId: socket.id, user: joinedUser });
      } else {
        socket.emit(ROOM_NOT_FOUND, socket.id);
        socket.disconnect();
      }
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

export const leaveRoomHandler =
  (socket: Socket) =>
  (roomId: string): void => {
    try {
      const user = changeUserStatus(store, roomId, socket.id, UserStatus.left);
      socket.emit(LEFT_ROOM, { userId: socket.id, user });
      socket.to(roomId).emit(USER_LEFT, { userId: socket.id, user });
      socket.disconnect();
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
