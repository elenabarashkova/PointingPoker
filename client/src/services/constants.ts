import { io } from 'socket.io-client';

export const socket = io('https://arcane-thicket-43676.herokuapp.com/', { transports: ['websocket', 'polling'] });

export const IS_ROOM_VALID = 'IS_ROOM_VALID';
export const ROOM_IS_NOT_VALID = 'ROOM_IS_NOT_VALID';
export const ROOM_IS_VALID = 'ROOM_IS_VALID';

export const CREATE_ROOM = 'CREATE_ROOM';
export const ROOM_WAS_CREATED = 'ROOM_WAS_CREATED';

export const JOIN_ROOM = 'JOIN_ROOM';
export const JOINED_ROOM = 'JOINED_ROOM';
export const USER_CONNECTED = 'USER_CONNECTED';
export const ROOM_NOT_FOUND = 'ROOM_NOT_FOUND';
