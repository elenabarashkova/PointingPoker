import { ChatEvents } from "../constants/events";
import { handleError } from "../helpers";
import { HandlerParams } from "../types";
import { EventCallback } from "../types/callbacks";
import { MessageData } from "../types/data";

export const sendMessageHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, text }: MessageData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const roomStr = await redisGetAsync(roomId);
      const room = JSON.parse(roomStr as string);
      const message = { userId: socket.id, text };
      room.messages.push(message);
      console.log(room);
      await redisSetAsync(roomId, JSON.stringify(room));
      callback({ status: 200, data: message });
      socket.to(roomId).emit(ChatEvents.receiveMessage, message);
    } catch {
      handleError(socket, callback);
    }
  };
