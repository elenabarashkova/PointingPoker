import { createRoom, createRoomId } from "../../actions/room";
import { handleError } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { User } from "../../types/user";

export const createRoomHandler =
  ({ socket, redisSetAsync }: HandlerParams) =>
  async (user: User, callback: EventCallback): Promise<void> => {
    try {
      console.log(user);
      const roomId = createRoomId();
      const room = createRoom(socket.id, user);
      await redisSetAsync(roomId, JSON.stringify(room));
      socket.join(roomId);
      callback({ status: 200, data: { room, roomId } });
      console.log(room);
    } catch {
      handleError(socket, callback);
    }
  };
