import { CommonNotification, Notifications, VotingData } from 'src/types/notifications';
import { SET_COMMON_NOTIFICATION, SET_IMPORTANT_NOTIFICATION, SET_VOTING_NOTIFICATION } from '../action-types';
  
export const initialState = {
  common: [],
  important: '',
  voting: {
    kickInitiator: '',
    kickedUserId: '',
  },
};
  
export type NotificationAction = {
  type: 'SET_COMMON_NOTIFICATION';
  commonNotification: CommonNotification;
} | {
  type: 'SET_IMPORTANT_NOTIFICATION';
  importantNotification: string;
} | {
  type: 'SET_VOTING_NOTIFICATION';
  voting: VotingData;
};
  
export const notifications = (
  state: Notifications = initialState,
  action: NotificationAction,
): Notifications => {
  switch (action.type) {
    case SET_COMMON_NOTIFICATION: 
      return {
        ...state,
        common: [
          ...state.common, action.commonNotification,
        ],
      };
    case SET_IMPORTANT_NOTIFICATION: {
      return {
        ...state, 
        important: action.importantNotification,
      };
    }   
    case SET_VOTING_NOTIFICATION: {
      console.log('data;', action.voting);
      return {
        ...state, 
        voting: action.voting,
      };
    }       
    default:
      return state;
  }
};
