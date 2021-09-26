export interface Game {
  gameStatus: string;
  roomId: string;
  isRoomValid: boolean;
  gameTitle: string;
  currentIssueId: string;
  roundIsActive: boolean;
  error: boolean;
  isLoading: boolean;
  canParticipate: boolean;
}
