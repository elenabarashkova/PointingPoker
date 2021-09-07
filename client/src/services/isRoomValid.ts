import { IS_ROOM_VALID, ResponseStatus, socket } from "./constants";

// Удалила try/catch, потому что у промисов есть свой обработчик catch
export const isRoomValid = (roomId: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    socket.emit(IS_ROOM_VALID, roomId, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => error);
// Подумать, что делать с ошибками
