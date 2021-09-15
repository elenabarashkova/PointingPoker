export interface Notifications {
  common: CommonNotification[];
  important: string;  
  voting: VotingData;
}
export interface CommonNotification {
  key: number;
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
