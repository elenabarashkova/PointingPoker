import { PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'src/types/messages';
import { SET_MESSAGES } from '../action-types';

export const setMessages = (messages: Array<Message>): PayloadAction<Array<Message>> => ({
  type: SET_MESSAGES,
  payload: messages,
});
