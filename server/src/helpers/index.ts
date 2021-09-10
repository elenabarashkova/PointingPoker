import { Socket } from "socket.io";
import { RedisGetAsyncType } from "../types/callbacks";
import { ErrorResponse } from "../types/data";
import { Issues } from "../types/issue";
import { Message } from "../types/message";
import { Room } from "../types/room";

export const sendError = (socket: Socket, data: ErrorResponse): void => {
  socket.emit("error", data);
};

export const handleError = (socket: Socket, callback: unknown): void => {
  const errorCallback =
    typeof callback === "function" ? callback : sendError.bind(null, socket);

  errorCallback({ status: 500, error: "error" });
};

export const getRoom = async (
  key: string,
  getByKey: RedisGetAsyncType
): Promise<Room> => {
  const response = await getByKey(key);
  return JSON.parse(response as string);
};

export const getIssueId = (issueList: Issues): string => {
  let id = (Math.random() * 1000 + 100).toString();
  if (issueList[id]) {
    id = getIssueId(issueList);
  }
  return id;
};

export const getMessageId = (messages: Message[]): string => {
  let id = (Math.floor(Math.random() * 10001) + 1000).toString();
  if (messages.some(({ messageId }) => messageId === id)) {
    id = getMessageId(messages);
  }
  return id;
};
