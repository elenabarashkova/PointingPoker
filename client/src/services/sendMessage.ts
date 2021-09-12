import { Message } from 'src/types/messages';
import { RoomData } from 'src/types/room';
import {
  ResponseStatus, SEND_MESSAGE, ERROR_RESULT, socket, 
} from './constants';

export type SendMessageResultType = typeof ERROR_RESULT | Message;

export const sendMessage = (roomId: string, text: string): Promise<SendMessageResultType> => (
  new Promise<RoomData>((resolve, reject) => {
    socket.emit(SEND_MESSAGE, { roomId, text }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => error));
