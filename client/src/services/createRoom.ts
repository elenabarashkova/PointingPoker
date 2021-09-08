import {
  CREATE_ROOM,
  ResponseStatus,
  socket,
} from './constants';
import { User } from '../types/user';

export const createRoom = (user: User): Promise<unknown> => (
  new Promise((resolve, reject) => {
    socket.emit(CREATE_ROOM, user, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => error));
