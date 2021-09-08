import { PayloadAction } from '@reduxjs/toolkit';
import { SET_MESSAGES } from '../action-types';
import { Messages, Message } from '../../types/messages';

export const initialState = {
  error: false,
  isLoading: false,
  messages: [],
};

export const messages = (
  state: Messages = initialState,
  { type, payload }: PayloadAction<Array<Message> | Message | boolean>,
): Messages => {
  if (type === SET_MESSAGES) {
    return {
      ...state,
      messages: payload as Array<Message>,
    };
  }

  return state;
};
