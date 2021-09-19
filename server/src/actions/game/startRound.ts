import { Round, Store } from '../../types/room';

export const startRound = (
  roomId: string,
  issueId: string,
  store: Store
): Round => {
  const room = store[roomId];
  room.currentRound = { issueId };
  return room.currentRound;
};
