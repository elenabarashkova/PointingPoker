import { nanoid } from 'nanoid';
import { Socket } from 'socket.io';
import { RedisGetAsyncType } from '../types/callbacks';
import { ErrorResponse } from '../types/data';
import { Room } from '../types/room';

export const sendError = (socket: Socket, data: ErrorResponse): void => {
  socket.emit('error', data);
};

export const handleError = (socket: Socket, callback: unknown): void => {
  const errorCallback =
    typeof callback === 'function' ? callback : sendError.bind(null, socket);

  errorCallback({ status: 500, error: 'error' });
};

export const getRoom = async (
  key: string,
  getByKey: RedisGetAsyncType
): Promise<Room> => {
  const response = await getByKey(key);
  return JSON.parse(response as string);
};

export const getId = (): string => nanoid();
