import { Store } from '../../types/room';

export const startRound = (
  roomId: string,
  issueId: string,
  store: Store
):  {roundIsActive: boolean, currentIssueId: string} => {
  const room = store[roomId];
  room.roundIsActive = true;
  room.currentIssueId = issueId;
  return {
    roundIsActive: room.roundIsActive,
    currentIssueId: room.currentIssueId
  };
};
