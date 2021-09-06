import { Socket } from "socket.io";
import { createRoom, createRoomId } from "../actions/room";
import { addUser, changeUserStatus } from "../actions/user";
import { RoomEvents, UserEvents } from "../constants/events";
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
      socket.emit(RoomEvents.roomWasCreated, { room: store[roomId], roomId });
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };

export const checkRoomHandler =
  (socket: Socket) =>
  (roomId: string): void => {
    try {
      if (store[roomId]) {
        socket.emit(RoomEvents.roomIsValid, roomId);
      } else {
        socket.emit(RoomEvents.roomIsNotValid);
      }
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    } finally {
      socket.disconnect();
    }
  };

export const joinRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: ConnectionData): void => {
    try {
      if (store[roomId]) {
        const joinedUser = addUser(store, roomId, socket.id, user);
        socket.join(roomId);
        socket.emit(UserEvents.joinedRoom, { room: store[roomId], roomId });
        socket.to(roomId).emit(UserEvents.userConnected, {
          userId: socket.id,
          user: joinedUser,
        });
      } else {
        socket.emit(RoomEvents.roomNotFound, socket.id);
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
      socket.emit(UserEvents.leftRoom, { userId: socket.id, user });
      socket.to(roomId).emit(UserEvents.userLeft, { userId: socket.id, user });
      socket.disconnect();
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
