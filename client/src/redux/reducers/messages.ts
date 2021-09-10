import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_IS_LOADING, SET_MESSAGE, SET_MESSAGES, SET_SERVER_ERROR, 
} from '../action-types';
import { Messages, Message, MessageData } from '../../types/messages';

export const initialState = {
  error: false,
  isLoading: false,
  messages: {},
};

export const messages = (
  state: Messages = initialState,
  { type, payload }: PayloadAction<MessageData | Record<string, Message> | boolean>,
): Messages => {
  console.log('payload:', payload, 'type:', type);

  switch (type) {
    case SET_MESSAGES: 
      return {
        ...state,
        messages: payload as Record<string, Message>,
      };
    case SET_MESSAGE: {
      const { messageId, message } = payload as MessageData;
      return {
        ...state, 
        messages: {
          ...state.messages,
          [messageId]: message,
        },
      };
    }
    case SET_SERVER_ERROR: 
      return {
        ...state,
        error: payload as boolean,
      };
    
    case SET_IS_LOADING: 
      return {
        ...state,
        isLoading: payload as boolean,
      };
       
    default:
      return state;
  }
};
