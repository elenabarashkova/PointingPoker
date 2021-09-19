import { getMessageId } from '../helpers';
import { Message } from '../types/message';
import { Store } from '../types/room';

export const addMessages = (
  roomId: string,
  userId: string,
  text: string,
  store: Store
): Message => {
  const room = store[roomId];
  const message = {
    userId,
    text,
    messageId: getMessageId(room.messages),
  };
  room.messages = [...room.messages, message];
  return message;
};
