import { Socket } from "socket.io";
import { addMessage } from "../actions/message";
import { ChatEvents } from "../constants/events";
import { store } from "../store";
import { MessageData } from "../types/data";

export const sendMessageHandler =
  (socket: Socket) =>
  ({ roomId, text }: MessageData): void => {
    try {
      const message = addMessage(store, roomId, socket.id, text);
      socket.emit(ChatEvents.messageWasSent, message);
      socket.to(roomId).emit(ChatEvents.receiveMessage, message);
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
