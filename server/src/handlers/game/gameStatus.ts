import { Socket } from 'socket.io';
import { changeGameStatus } from '../../actions/game/changeGameStatus';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameData } from '../../types/game';

export const gameStatusHandler =
  (socket: Socket) =>
  ({ roomId, gameStatus }: GameData, callback: EventCallback): void => {
    try {
      changeGameStatus(roomId, gameStatus, store);
      callback({ status: 200, data: gameStatus });
      socket.to(roomId).emit(GameEvents.gameStatusChanged, gameStatus);
    } catch {
      handleError(socket, callback);
    }
  };
