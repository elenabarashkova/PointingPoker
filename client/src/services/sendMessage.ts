import { Message } from 'src/types/messages';
import { RoomData } from 'src/types/room';
import { ResponseStatus, SEND_MESSAGE, socket } from './constants';

export const sendMessage = (roomId: string, text: string): Promise<Message> => (
  new Promise<RoomData>((resolve, reject) => {
    socket.emit(SEND_MESSAGE, { roomId, text }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => error));
