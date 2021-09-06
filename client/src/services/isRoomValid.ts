import {
  IS_ROOM_VALID,
  ROOM_IS_NOT_VALID,
  ROOM_IS_VALID,
  socket,
} from './constants';

export const isRoomValid = async (roomId: string): Promise<boolean | Error> => {
  try {
    return await (
      new Promise((resolve, reject) => {
        socket.emit(IS_ROOM_VALID, roomId);
        socket.on(ROOM_IS_NOT_VALID, () => {
          resolve(false);
        });
        socket.on(ROOM_IS_VALID, () => {
          resolve(true);
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
