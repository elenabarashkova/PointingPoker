import { io } from 'socket.io-client';

export const socket = io('https://arcane-thicket-43676.herokuapp.com/', {
  transports: ['websocket', 'polling'],
});

export enum ResponseStatus {
  ok = 200,
  notFound = 404,
  error = 500,
}

export const IS_ROOM_VALID = 'IS_ROOM_VALID';
export const CREATE_ROOM = 'CREATE_ROOM';
export const ROOM_NOT_FOUND = 'ROOM_NOT_FOUND';

export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const USER_CONNECTED = 'USER_CONNECTED';
export const USER_LEFT = 'USER_LEFT';
export const USER_DISCONNECTED = 'USER_DISCONNECTED';
export const DISCONNECTING = 'disconnecting';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const KICK_USER = 'KICK_USER';
export const YOU_ARE_KICKED = 'YOU_ARE_KICKED';
export const USER_IS_KICKED = 'USER_IS_KICKED';
export const DELETE_USER = 'DELETE_USER';
export const YOU_ARE_DELETED = 'YOU_ARE_DELETED';
export const USER_IS_DELETED = 'USER_IS_DELETED';
export const YOU_ARE_NOT_DELETED = 'YOU_ARE_NOT_DELETED';
export const USER_IS_NOT_DELETED = 'USER_IS_NOT_DELETED';
export const KICKING_VOTE = 'KICKING_VOTE';

export const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS';
export const START_GAME = 'START_GAME';
export const GAME_STATUS_CHANGED = 'GAME_STATUS_CHANGED';
export const GAME_IS_STARTED = 'GAME_IS_STARTED';

export const ERROR_RESULT = 'error';

export enum Events {
  addIssue = 'ADD_ISSUE',
  deleteIssue = 'DELETE_ISSUE',
  updateIssue = 'UPDATE_ISSUE',
  activateIssue = 'ACTIVATE_ISSUE',
}
