import { changeGameSettings } from "../../actions/game";
import { GameEvents } from "../../constants/events";
import { getRoom, handleError } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { GameSettingsData } from "../../types/game";

export const gameSettingsHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, settings }: GameSettingsData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const { updatedSettings, updatedRoom } = changeGameSettings(
        room,
        settings
      );
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      callback({ status: 200, data: updatedSettings });
      socket.to(roomId).emit(GameEvents.gameSettingsChanged, updatedSettings);
    } catch {
      handleError(socket, callback);
    }
  };
