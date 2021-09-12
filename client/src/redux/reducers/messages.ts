import {
  SET_IS_LOADING, SET_MESSAGE, SET_MESSAGES, SET_SERVER_ERROR, 
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
  type: 'SET_MESSAGE';
  message: Message;
} | {
  type: 'SET_SERVER_ERROR';
  isError: boolean;
} | {
  type: 'SET_IS_LOADING';
  isLoading: boolean;
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
    case SET_MESSAGE: {
      return {
        ...state, 
        messages: [
          ...state.messages,
          action.message,
        ],
      };
    }
    case SET_SERVER_ERROR: 
      return {
        ...state,
        error: action.isError,
      };
    
    case SET_IS_LOADING: 
      return {
        ...state,
        isLoading: action.isLoading,
      };
       
    default:
      return state;
  }
};
