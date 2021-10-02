import { Socket } from 'socket.io';
import { changeGameTitle } from '../../actions/game/changeGameTitle';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameData } from '../../types/game';

export const gameTitleHandler =
  (socket: Socket) =>
  ({ roomId, gameTitle }: GameData, callback: EventCallback): void => {
    try {
      const title = changeGameTitle(roomId, gameTitle, store);
      callback({ status: 200, data: title });
      socket.to(roomId).emit(GameEvents.gameTitleChanged, title);
    } catch (error: unknown) {
      handleError(error as Error, socket, callback);
    }
  };
