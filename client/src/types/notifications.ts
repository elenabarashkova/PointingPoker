import { UserData } from './user';

export interface Notifications {
  common: CommonNotification[];
  important: string;
  voting: VotingData;
  admitUser: UserData;
}
export interface CommonNotification {
  key: string;
  data: string;
  type: keyof typeof CommonNotificationType;
}
export enum CommonNotificationType {
  success = 'success',
  error = 'error',
}
export interface VotingData {
  kickInitiator: string;
  kickedUserId: string;
}
export enum ImportantNotifications {
  kick = 'Somebody wants to kick you. Now your team will vote.',
  notDeleted = 'Congratulations. Your team decided to keep you in the game session.',
  gameCanceled = 'Game is canceled',
  userExitGame = 'You are out of the game',
  masterDisconnected = 'Master disconnected, current game is over, you will be redirected to the result page',
}

export enum CommonNotificationAction {
  connect = 'connect',
  disconnected = 'disconnected',
  deleted = 'deleted',
  isNotDeleted = 'isNotDeleted',
  left = 'left',
}
