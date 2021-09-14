import {
  MESSAGE_ON_REQUEST,
  MESSAGE_ON_RESPONCE,
  MESSAGE_ON_RESPONCE_FAIL, 
  SET_MESSAGES, 
} from '../action-types';
import { Messages, Message } from '../../types/messages';

export const initialState = {
  error: false,
  isLoading: false,
  messages: [],
};

export type MessageAction = {
  type: 'SET_MESSAGES';
  messages: Message[];
} | {
  type: 'MESSAGE_ON_REQUEST';
} | {
  type: 'MESSAGE_ON_RESPONCE';
  message: Message;
} | {
  type: 'MESSAGE_ON_RESPONCE_FAIL';
};

export const messages = (
  state: Messages = initialState,
  action: MessageAction,
): Messages => {
  switch (action.type) {
    case SET_MESSAGES: 
      return {
        ...state,
        messages: action.messages,
      };
    case MESSAGE_ON_REQUEST: {
      return {
        ...state, 
        error: false,
        isLoading: true,
      };
    }
    case MESSAGE_ON_RESPONCE: 
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message,
        ],
        error: false,
        isLoading: false,
      };
    
    case MESSAGE_ON_RESPONCE_FAIL: 
      return {
        ...state,
        error: true,
        isLoading: false,
      };
       
    default:
      return state;
  }
};
