import {
  IS_ROOM_VALID, ResponseStatus,
  socket,
} from './constants';

export const isRoomValid = (roomId: string, showError: CallableFunction): Promise<unknown> => (
  new Promise((resolve, reject) => {
    socket.emit(IS_ROOM_VALID, roomId, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => showError()));
