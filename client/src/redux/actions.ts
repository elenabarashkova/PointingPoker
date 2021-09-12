import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_USERS,
  SET_CURRENT_USER,
  SET_ROOM_ID,
  SET_IS_ROOM_VALID,
  SET_GAME_STATUS,
  SET_ALL_GAME_SETTINGS, SET_MESSAGES, SET_IS_LOADING, SET_SERVER_ERROR, SET_ISSUES, SET_MESSAGE, SET_USER,
} from './action-types';
import { UserData, Users } from '../types/user';
import { GameSettings } from '../types/room';
import { Message } from '../types/messages';
import { Issue } from '../types/issues';
import { MessageAction } from './reducers/messages';

export const setUsersAction = (users: Users): PayloadAction<Users> => ({
  type: SET_USERS,
  payload: users,
});

export const setUser = (userData: UserData): PayloadAction<UserData> => ({
  type: SET_USER,
  payload: userData,
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

export const setIssues = (issues: Array<Issue>): PayloadAction<Array<Issue>> => ({
  type: SET_ISSUES,
  payload: issues,
});
