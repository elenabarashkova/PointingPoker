import { Message } from 'src/types/messages';
import {
  SET_IS_LOADING, SET_MESSAGE, SET_MESSAGES, SET_SERVER_ERROR, 
} from '../action-types';
import { MessageAction } from '../reducers/messages';

export const setMessages = (messages: Message[]): MessageAction => ({
  type: SET_MESSAGES,
  messages,
});

export const setMessage = (message: Message): MessageAction => ({
  type: SET_MESSAGE,
  message,
});

export const setMessageStatusIsLoading = (isLoading: boolean): MessageAction => ({
  type: SET_IS_LOADING,
  isLoading,
});

export const setServerStatusError = (isError: boolean): MessageAction => ({
  type: SET_SERVER_ERROR,
  isError,
});
