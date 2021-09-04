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
    createRoom(store, roomId);
    addUser(store, roomId, socket.id, {
      ...user,
      role: UserRole.master,
    });
    socket.join(roomId);
    socket.emit(ROOM_WAS_CREATED, socket.id, store[roomId]);
  };

export const joinRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: ConnectionData): void => {
    if (store[roomId]) {
      const joinedUser = addUser(store, roomId, socket.id, user);
      socket.join(roomId);
      socket.emit(JOINED_ROOM, socket.id, store[roomId]);
      socket.to(roomId).emit(USER_CONNECTED, socket.id, joinedUser);
    } else {
      socket.emit(ROOM_NOT_FOUND, socket.id);
      socket.disconnect();
    }
  };

export const leaveRoomHandler =
  (socket: Socket) =>
  (roomId: string): void => {
    changeUserStatus(store, roomId, socket.id, UserStatus.left);
    socket.emit(LEFT_ROOM, socket.id);
    socket.to(roomId).emit(USER_LEFT, socket.id);
  };
