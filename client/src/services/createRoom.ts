import {
  CREATE_ROOM, ResponseStatus,
  socket,
} from './constants';
import { User } from '../types/user';
import { RoomData } from '../types/room';

export const createRoom = (user: User): Promise<RoomData | Error> => {
  try {
    return (
      new Promise((resolve, reject) => {
        socket.emit(CREATE_ROOM, user, ({ status, data, error }) => {
          if (status === ResponseStatus.ok) {
            resolve(data);
            return;
          }
          reject(error);
        });
      })
    );
  } catch (error) {
    return error;
  }
};
