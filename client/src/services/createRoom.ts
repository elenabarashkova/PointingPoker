import {
  CREATE_ROOM,
  ROOM_WAS_CREATED,
  socket,
} from './constants';
import { User } from '../types/user';

export const createRoom = async (user: User): Promise<any | Error> => {
  try {
    return await (
      new Promise((resolve, reject) => {
        socket.emit(CREATE_ROOM, user);
        socket.on(ROOM_WAS_CREATED, (data) => {
          resolve(data);
        });
        socket.on('error', (error) => {
          reject(error);
        });
      })
    );
  } catch (error) {
    return error;
  }
};
