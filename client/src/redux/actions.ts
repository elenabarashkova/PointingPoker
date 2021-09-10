import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_USERS,
  SET_CURRENT_USER,
  SET_ROOM_ID,
  SET_IS_ROOM_VALID,
  SET_GAME_STATUS,
  SET_ALL_GAME_SETTINGS, SET_MESSAGES, SET_IS_LOADING, SET_SERVER_ERROR, SET_ISSUES, SET_MESSAGE,
} from './action-types';
import { Users } from '../types/user';
import { GameSettings } from '../types/room';
import { Message, MessageData } from '../types/messages';
import { Issue } from '../types/issues';

export const setUsersAction = (users: Users): PayloadAction<Users> => ({
  type: SET_USERS,
  payload: users,
});

export const setCurrentUserAction = (userId: string): PayloadAction<string> => ({
  type: SET_CURRENT_USER,
  payload: userId,
});

export const setRoomIdAction = (roomId: string): PayloadAction<string> => ({
  type: SET_ROOM_ID,
  payload: roomId,
});

export const setIsRoomValid = (isRoomValid: boolean): PayloadAction<boolean> => ({
  type: SET_IS_ROOM_VALID,
  payload: isRoomValid,
});

export const setGameStatus = (gameStatus: string): PayloadAction<string> => ({
  type: SET_GAME_STATUS,
  payload: gameStatus,
});

export const setAllGameSettings = (gameSettings: GameSettings): PayloadAction<GameSettings> => ({
  type: SET_ALL_GAME_SETTINGS,
  payload: gameSettings,
});

export const setMessages = (messages: Record<string, string | Message>): PayloadAction<Record<string, string | Message>> => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setMessage = (message: MessageData): PayloadAction<MessageData> => ({
  type: SET_MESSAGE,
  payload: message,
});

export const setMessageStatusIsLoading = (isLoading: boolean): PayloadAction<boolean> => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setServerStatusError = (isError: boolean): PayloadAction<boolean> => ({
  type: SET_SERVER_ERROR,
  payload: isError,
});

export const setIssues = (issues: Array<Issue>): PayloadAction<Array<Issue>> => ({
  type: SET_ISSUES,
  payload: issues,
});
