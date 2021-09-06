import { Socket } from "socket.io";
import { addMessage } from "../actions/message";
import { ChatEvents } from "../constants/events";
import { store } from "../store";
import { EventCallback } from "../types/callbacks";
import { MessageData } from "../types/data";

export const sendMessageHandler =
  (socket: Socket) =>
  ({ roomId, text }: MessageData, callback: EventCallback): void => {
    try {
      const message = addMessage(store, roomId, socket.id, text);
      callback({ status: 200, data: message });
      socket.to(roomId).emit(ChatEvents.receiveMessage, message);
    } catch {
      callback({ status: 500, error: "error" });
    }
  };
