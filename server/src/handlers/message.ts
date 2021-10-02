import { Socket } from 'socket.io';
import { addMessages } from '../actions/messages';
import { ChatEvents } from '../constants/events';
import { handleError } from '../helpers';
import { store } from '../store';
import { EventCallback } from '../types/callbacks';
import { MessageData } from '../types/data';

export const sendMessageHandler =
  (socket: Socket) =>
  ({ roomId, text }: MessageData, callback: EventCallback): void => {
    try {
      const message = addMessages(roomId, socket.id, text, store);
      callback({ status: 200, data: message });
      socket.to(roomId).emit(ChatEvents.receiveMessage, message);
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
