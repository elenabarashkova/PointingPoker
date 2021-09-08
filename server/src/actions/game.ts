import { GameSettings, GameStatus } from "../types/game";
import { Room } from "../types/room";

export const changeGameSettings = (
  room: Room,
  settings: GameSettings
): { updatedSettings: GameSettings; updatedRoom: Room } => {
  const updatedSettings = { ...room.gameSettings, ...settings };
  const updatedRoom = { ...room, gameSettings: updatedSettings };
  return { updatedSettings, updatedRoom };
};

export const changeGameStatus = (
  room: Room,
  gameStatus: keyof typeof GameStatus
): Room => ({ ...room, gameStatus });
