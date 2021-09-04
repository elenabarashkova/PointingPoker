import { Socket } from "socket.io";
import { addMessage } from "../actions/message";
import { MESSAGE_WAS_SENDED, RECEIVE_MESSAGE } from "../events";
import { store } from "../store";
import { MessageData } from "../types/data";

export const sendMessageHandler =
  (socket: Socket) =>
  ({ roomId, text }: MessageData): void => {
    const message = addMessage(store, roomId, socket.id, text);
    socket.emit(MESSAGE_WAS_SENDED, socket.id, message);
    socket.to(roomId).emit(RECEIVE_MESSAGE, message);
  };
