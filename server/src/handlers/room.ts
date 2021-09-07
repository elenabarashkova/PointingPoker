import { createRoom, createRoomId } from "../actions/room";
import { addUser, changeUserStatus } from "../actions/user";
import { UserEvents } from "../constants/events";
import { handleError } from "../helpers";
import { HandlerParams } from "../types";
import { EventCallback } from "../types/callbacks";
import { ConnectionData } from "../types/data";
import { User, UserStatus } from "../types/user";

export const createRoomHandler =
  ({ socket, redisSetAsync }: HandlerParams) =>
  async (user: User, callback: EventCallback): Promise<void> => {
    try {
      const roomId = createRoomId();
      const room = createRoom(socket.id, user);
      await redisSetAsync(roomId, JSON.stringify(room));
      socket.join(roomId);
      callback({ status: 200, data: { room, roomId } });
    } catch {
      handleError(socket, callback);
    }
  };

export const checkRoomHandler =
  ({ socket, redisGetAsync }: HandlerParams) =>
  async (roomId: string, callback: EventCallback): Promise<void> => {
    try {
      const room = await redisGetAsync(roomId);
      callback({ status: 200, data: !!room });
    } catch {
      handleError(socket, callback);
    }
  };

export const joinRoomHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, user }: ConnectionData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const roomStr = await redisGetAsync(roomId);
      if (roomStr) {
        const room = JSON.parse(roomStr as string);
        const { updatedRoom, joinedUser } = addUser(room, socket.id, user);
        await redisSetAsync(roomId, JSON.stringify(updatedRoom));
        callback({ status: 200, data: { room: updatedRoom, roomId } });
        socket.join(roomId);
        socket.to(roomId).emit(UserEvents.userConnected, {
          userId: socket.id,
          user: joinedUser,
        });
      } else {
        callback({ status: 404, data: "Room not found" });
        socket.disconnect();
      }
    } catch {
      handleError(socket, callback);
    }
  };

export const leaveRoomHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (roomId: string, callback: EventCallback): Promise<void> => {
    try {
      const roomStr = await redisGetAsync(roomId);
      const room = JSON.parse(roomStr as string);
      const { updatedRoom, updatedUser } = changeUserStatus(
        room,
        socket.id,
        UserStatus.left
      );
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      callback({ status: 200, data: { userId: socket.id, user: updatedUser } });
      socket
        .to(roomId)
        .emit(UserEvents.userLeft, { userId: socket.id, user: updatedUser });
      socket.disconnect();
    } catch {
      handleError(socket, callback);
    }
  };
