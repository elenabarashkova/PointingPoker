import { User, UserData } from 'src/types/user';
import {
  ResponseStatus, ERROR_RESULT, socket, DELETE_USER, 
} from '../constants';

export type DeleteUserResultType = typeof ERROR_RESULT | UserData;

export const deleteUser = (roomId: string, userId: string): Promise<DeleteUserResultType> => (
  new Promise<DeleteUserResultType>((resolve, reject) => {
    socket.emit(DELETE_USER, { userId, roomId }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => error));
