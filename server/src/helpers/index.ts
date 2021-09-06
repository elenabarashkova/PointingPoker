import { Socket } from "socket.io";
import { ErrorResponse } from "../types/data";

export const sendError = (socket: Socket, data: ErrorResponse): void => {
  socket.emit("error", data);
};

export const handleError = (
  socket: Socket,
  callback: unknown,
  disconnect: boolean
): void => {
  const errorCallback =
    typeof callback === "function" ? callback : sendError.bind(null, socket);

  errorCallback({ status: 500, error: "error" });

  if (disconnect) {
    socket.disconnect();
  }
};
