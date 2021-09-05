import { Socket } from "socket.io";
import { createRoom } from "../actions/room";
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
import { UserRole, UserStatus } from "../types/user";

export const createRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: ConnectionData): void => {
    try {
      createRoom(store, roomId);
      addUser(store, roomId, socket.id, {
        ...user,
        role: UserRole.master,
      });
      socket.join(roomId);
      socket.emit(ROOM_WAS_CREATED, store[roomId]);
    } catch (error) {
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
        socket.emit(JOINED_ROOM, store[roomId]);
        socket.to(roomId).emit(USER_CONNECTED, socket.id, joinedUser);
      } else {
        socket.emit(ROOM_NOT_FOUND, socket.id);
        socket.disconnect();
      }
    } catch (error) {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

export const leaveRoomHandler =
  (socket: Socket) =>
  (roomId: string): void => {
    try {
      changeUserStatus(store, roomId, socket.id, UserStatus.left);
      socket.emit(LEFT_ROOM);
      socket.to(roomId).emit(USER_LEFT, socket.id);
    } catch (error) {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
