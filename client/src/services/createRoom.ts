import { User } from "../types/user";
import { CREATE_ROOM, ResponseStatus, socket } from "./constants";

// Удалила try/catch, потому что у промисов есть свой обработчик catch

export const createRoom = (user: User): Promise<unknown> =>
  new Promise((resolve, reject) => {
    socket.emit(CREATE_ROOM, user, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  }).catch((error) => error);
