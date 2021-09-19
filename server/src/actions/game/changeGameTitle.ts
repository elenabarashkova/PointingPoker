import { Store } from '../../types/room';

export const changeGameTitle = (
  roomId: string,
  title: string,
  store: Store
): string => {
  const room = store[roomId];
  room.gameTitle = title;
  return title;
};
