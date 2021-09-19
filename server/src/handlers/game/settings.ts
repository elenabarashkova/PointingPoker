import { Socket } from 'socket.io';
import { changeGameSettings } from '../../actions/game/changeGameSettings';
import { GameEvents } from '../../constants/events';
import { handleError } from '../../helpers';
import { store } from '../../store';
import { EventCallback } from '../../types/callbacks';
import { GameData } from '../../types/game';

export const gameSettingsHandler =
  (socket: Socket) =>
  ({ roomId, settings }: GameData, callback: EventCallback): void => {
    try {
      const updatedSettings = changeGameSettings(roomId, settings, store);
      callback({ status: 200, data: updatedSettings });
      socket.to(roomId).emit(GameEvents.gameSettingsChanged, updatedSettings);
    } catch {
      handleError(socket, callback);
    }
  };
