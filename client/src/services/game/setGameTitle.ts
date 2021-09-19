import { ResponseStatus, CHANGE_GAME_TITLE, socket } from '../constants';

export const setGameTitle = (roomId: string, gameTitle: string): Promise<string> => (
  new Promise<string>((resolve, reject) => {
    socket.emit(CHANGE_GAME_TITLE, { roomId, gameTitle }, ({ status, data, error }) => {
      if (status === ResponseStatus.ok) {
        resolve(data);
        return;
      }
      reject(error);
    });
  })
);
