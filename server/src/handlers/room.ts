import { Socket } from "socket.io";
import { createRoom, createRoomId } from "../actions/room";
import { addUser, changeUserStatus } from "../actions/user";
import { UserEvents } from "../constants/events";
import { store } from "../store";
import { EventCallback } from "../types/callbacks";
import { ConnectionData } from "../types/data";
import { User, UserRole, UserStatus } from "../types/user";

export const createRoomHandler =
  (socket: Socket) =>
  (user: User, callback: EventCallback): void => {
    try {
      const roomId = createRoomId(store);
      createRoom(store, roomId);
      addUser(store, roomId, socket.id, {
        ...user,
        role: UserRole.master,
      });
      socket.join(roomId);
      callback({ status: 200, data: { room: store[roomId], roomId } });
    } catch {
      callback({ status: 500, error: "error" });
    }
  };

export const checkRoomHandler =
  (socket: Socket) =>
  (roomId: string, callback: EventCallback): void => {
    try {
      const response = store[roomId] ? true : false;
      callback({ status: 200, data: response });
    } catch {
      callback({ status: 500, error: "error" });
    } finally {
      socket.disconnect();
    }
  };

export const joinRoomHandler =
  (socket: Socket) =>
  ({ roomId, user }: ConnectionData, callback: EventCallback): void => {
    try {
      if (store[roomId]) {
        const joinedUser = addUser(store, roomId, socket.id, user);
        socket.join(roomId);
        callback({ status: 200, data: { room: store[roomId], roomId } });
        socket.to(roomId).emit(UserEvents.userConnected, {
          userId: socket.id,
          user: joinedUser,
        });
      } else {
        callback({ status: 404, data: "Room not found" });
        socket.disconnect();
      }
    } catch {
      callback({ status: 500, error: "error" });
    }
  };

export const leaveRoomHandler =
  (socket: Socket) =>
  (roomId: string, callback: EventCallback): void => {
    try {
      const user = changeUserStatus(store, roomId, socket.id, UserStatus.left);
      callback({ status: 200, data: { userId: socket.id, user } });
      socket.to(roomId).emit(UserEvents.userLeft, { userId: socket.id, user });
      socket.disconnect();
    } catch {
      callback({ status: 500, error: "error" });
    }
  };
