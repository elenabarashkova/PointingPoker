import { StartRoundData } from 'src/types/game';
import { Events, ResponseStatus, socket } from '../constants';

export const startRound = (roomId: string, issueId: string): Promise<StartRoundData> => new Promise((resolve, reject) => {
  socket.emit(Events.startRound, { roomId, issueId }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(new Error(error));
  });
});


