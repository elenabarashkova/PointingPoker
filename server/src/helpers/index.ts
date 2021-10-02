import { nanoid } from 'nanoid';
import { Socket } from 'socket.io';
import { RedisGetAsyncType } from '../types/callbacks';
import { ErrorResponse } from '../types/data';
import { Room } from '../types/room';

export const sendError = (socket: Socket, data: ErrorResponse): void => {
  socket.emit('error', data);
};

export const handleError = (
  error: Error,
  socket: Socket,
  callback: unknown
): void => {
  const errorCallback =
    typeof callback === 'function' ? callback : sendError.bind(null, socket);

  const { name, message } = error;
  errorCallback({ status: 500, error: { name, message } });
};

export const getRoom = async (
  key: string,
  getByKey: RedisGetAsyncType
): Promise<Room> => {
  const response = await getByKey(key);
  return JSON.parse(response as string);
};

export const getId = (): string => nanoid();
