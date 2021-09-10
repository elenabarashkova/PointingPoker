import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_IS_LOADING, SET_MESSAGE, SET_MESSAGES, SET_SERVER_ERROR, 
} from '../action-types';
import { Messages, Message } from '../../types/messages';

export const initialState = {
  error: false,
  isLoading: false,
  messages: [],
};

export const messages = (
  state: Messages = initialState,
  { type, payload }: PayloadAction<Message[] | Message | boolean>,
): Messages => {
  console.log('payload:', payload, 'type:', type);

  switch (type) {
    case SET_MESSAGES: 
      return {
        ...state,
        messages: payload as Message[],
      };
    case SET_MESSAGE: {
      return {
        ...state, 
        messages: [
          ...state.messages,
          payload as Message,
        ],
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
