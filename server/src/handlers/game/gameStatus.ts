import { Socket } from 'socket.io';
import { changeGameStatus } from '../../actions/game';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameStatusData } from '../../types/game';

export const gameStatusHandler =
  (socket: Socket) =>
  ({ roomId, gameStatus }: GameStatusData, callback: EventCallback): void => {
    try {
      changeGameStatus(roomId, gameStatus, store);
      callback({ status: 200, data: gameStatus });
      socket.to(roomId).emit(GameEvents.gameStatusChanged, gameStatus);
    } catch {
      handleError(socket, callback);
    }
  };
