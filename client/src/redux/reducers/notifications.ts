import { CommonNotification, Notifications, VotingData } from 'src/types/notifications';
import {
  REMOVE_COMMON_NOTIFICATION,
  REMOVE_IMPORTANT_NOTIFICATION, SET_COMMON_NOTIFICATION, SET_IMPORTANT_NOTIFICATION, SET_VOTING_NOTIFICATION, 
} from '../action-types';
  
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
  type: 'REMOVE_COMMON_NOTIFICATION';
  notificationKey: string;
} | {
  type: 'SET_IMPORTANT_NOTIFICATION';
  importantNotification: string;
} | {
  type: 'REMOVE_IMPORTANT_NOTIFICATION';
} | {
  type: 'SET_VOTING_NOTIFICATION';
  voting: VotingData;
};
  
export const notifications = (
  state: Notifications = initialState,
  action: NotificationAction,
): Notifications => {
  switch (action.type) {
    case SET_COMMON_NOTIFICATION: {
      return {
        ...state,
        common: [
          ...state.common, action.commonNotification,
        ],
      };
    }
    case REMOVE_COMMON_NOTIFICATION: {
      return {
        ...state,
        common: [
          ...state.common.filter((item) => item.key !== action.notificationKey),
        ],
      };
    }
    case SET_IMPORTANT_NOTIFICATION: {
      return {
        ...state, 
        important: action.importantNotification,
      };
    }  
    case REMOVE_IMPORTANT_NOTIFICATION: {
      return {
        ...state, 
        important: '',
      };
    }  
    case SET_VOTING_NOTIFICATION: {
      return {
        ...state, 
        voting: action.voting,
      };
    }       
    default:
      return state;
  }
};
