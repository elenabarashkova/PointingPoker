import { StopRoundData } from 'src/types/game';
import { Events, ResponseStatus, socket } from '../constants';

export const sendStopRound = (roomId: string): Promise<StopRoundData> => new Promise((resolve, reject) => {
  socket.emit(Events.stopRound, roomId, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(error);
  });
});
