import { Socket } from "socket.io";
import { addMessage } from "../actions/message";
import { MESSAGE_WAS_SENDED, RECEIVE_MESSAGE } from "../events";
import { store } from "../store";
import { MessageData } from "../types/data";

export const sendMessageHandler =
  (socket: Socket) =>
  ({ roomId, text }: MessageData): void => {
    try {
      const message = addMessage(store, roomId, socket.id, text);
      socket.emit(MESSAGE_WAS_SENDED, message);
      socket.to(roomId).emit(RECEIVE_MESSAGE, message);
    } catch {
      socket.emit("error", { status: 500, message: "error" });
    }
  };
