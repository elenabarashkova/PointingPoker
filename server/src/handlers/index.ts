import { Socket } from "socket.io";
import {
  JOINED_ROOM,
  KICKED_FROM_ROOM,
  LEFT_ROOM,
  MESSAGE_WAS_SENDED,
  RECEIVE_MESSAGE,
  ROOM_NOT_FOUND,
  ROOM_WAS_CREATED,
  USER_CONNECTED,
  USER_KICKED,
  USER_LEFT,
} from "../events";
import { store } from "../store";
import { ConnectionData, MessageData, UserData } from "../types/data";
import { UserStatus } from "../types/user";
import { addMessage, addUser, changeUserStatus, createRoom } from "../utils";

export const getCreateRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: ConnectionData): void => {
    createRoom(store, roomId, socket.id, user);
    socket.join(roomId);
    socket.emit(ROOM_WAS_CREATED, socket.id, store[roomId]);
  };

export const getJoinRoomHandler =
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

export const getSendMessageHandler =
  (socket: Socket) =>
  ({ roomId, text }: MessageData): void => {
    const message = addMessage(store, roomId, socket.id, text);
    socket.emit(MESSAGE_WAS_SENDED, socket.id, message);
    socket.to(roomId).emit(RECEIVE_MESSAGE, message);
  };

export const getLeaveRoomHandler =
  (socket: Socket) =>
  (roomId: string): void => {
    changeUserStatus(store, roomId, socket.id, UserStatus.left);
    socket.emit(LEFT_ROOM, socket.id);
    socket.to(roomId).emit(USER_LEFT, socket.id);
  };

export const getKickUserHandler =
  (socket: Socket) =>
  ({ userId, roomId }: UserData): void => {
    changeUserStatus(store, roomId, userId, UserStatus.kicked);
    socket.emit(KICKED_FROM_ROOM, userId);
    socket.to(roomId).emit(USER_KICKED, userId);
  };
