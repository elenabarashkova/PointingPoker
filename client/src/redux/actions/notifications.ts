import { CommonNotification, ImportantNotifications, VotingData } from 'src/types/notifications';
import {
  SET_COMMON_NOTIFICATION, 
  SET_IMPORTANT_NOTIFICATION, 
  SET_VOTING_NOTIFICATION, 
  REMOVE_IMPORTANT_NOTIFICATION, 
  REMOVE_COMMON_NOTIFICATION, 
} from '../action-types';
import { NotificationAction } from '../reducers/notifications';

export const setCommonNotification = (notification: CommonNotification): NotificationAction => ({
  type: SET_COMMON_NOTIFICATION,
  commonNotification: notification,
});

export const removeCommonNotification = (key: string): NotificationAction => ({
  type: REMOVE_COMMON_NOTIFICATION,
  notificationKey: key,
});
  
export const setImportantNotification = (notification: string): NotificationAction => ({
  type: SET_IMPORTANT_NOTIFICATION,
  importantNotification: notification,
});

export const removeImportantNotification = (): NotificationAction => ({
  type: REMOVE_IMPORTANT_NOTIFICATION,
});

export const setVotingNotification = (data: VotingData): NotificationAction => ({
  type: SET_VOTING_NOTIFICATION,
  voting: data,
});
