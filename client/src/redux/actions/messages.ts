import { Message } from 'src/types/messages';
import { 
  MESSAGE_ON_REQUEST, 
  MESSAGE_ON_RESPONCE, 
  MESSAGE_ON_RESPONCE_FAIL, 
  SET_MESSAGES, 
} from '../action-types';
import { MessageAction } from '../reducers/messages';

export const setMessages = (messages: Message[]): MessageAction => ({
  type: SET_MESSAGES,
  messages,
});

export const setMessageOnRequest = (): MessageAction => ({
  type: MESSAGE_ON_REQUEST,
});

export const setMessageOnResponse = (message: Message): MessageAction => ({
  type: MESSAGE_ON_RESPONCE,
  message,
});

export const setMessageOnResponseFail = (): MessageAction => ({
  type: MESSAGE_ON_RESPONCE_FAIL,
});
