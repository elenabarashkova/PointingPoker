import { Message } from "../types/message";
import { StoreSchema } from "../types/store";

export const addMessage = (
  store: StoreSchema,
  roomId: string,
  userId: string,
  text: string
): Message => {
  const message = { userId: userId, text };
  store[roomId].messages = [...store[roomId].messages, message];
  return message;
};
