import { createRoom, createRoomId } from "../actions/room";
import { handleError } from "../helpers";
import { HandlerParams } from "../types";
import { EventCallback } from "../types/callbacks";
import { User } from "../types/user";

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
