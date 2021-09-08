import { changeGameStatus } from "../../actions/game";
import { GameEvents } from "../../constants/events";
import { getRoom, handleError } from "../../helpers";
import { HandlerParams } from "../../types";
import { EventCallback } from "../../types/callbacks";
import { GameStatusData } from "../../types/game";

export const gameStatusHandler =
  ({ socket, redisGetAsync, redisSetAsync }: HandlerParams) =>
  async (
    { roomId, gameStatus }: GameStatusData,
    callback: EventCallback
  ): Promise<void> => {
    try {
      const room = await getRoom(roomId, redisGetAsync);
      const updatedRoom = changeGameStatus(room, gameStatus);
      await redisSetAsync(roomId, JSON.stringify(updatedRoom));
      callback({ status: 200, data: gameStatus });
      console.log(gameStatus);
      socket.to(roomId).emit(GameEvents.gameStatusChanged, gameStatus);
    } catch {
      handleError(socket, callback);
    }
  };
