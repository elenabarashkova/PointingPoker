import { GameSettings } from "../types/game";
import { Room } from "../types/store";

export const changeGameSettings = (
  room: Room,
  settings: GameSettings
): { updatedSettings: GameSettings; updatedRoom: Room } => {
  const updatedSettings = { ...room.gameSettings, ...settings };
  const updatedRoom = { ...room, gameSettings: updatedSettings };
  return { updatedSettings, updatedRoom };
};
