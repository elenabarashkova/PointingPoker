import { io } from 'socket.io-client';

export const socket = io('https://arcane-thicket-43676.herokuapp.com/', { transports: ['websocket', 'polling'] });

export const IS_ROOM_VALID = 'IS_ROOM_VALID';
export const ROOM_IS_NOT_VALID = 'ROOM_IS_NOT_VALID';
export const ROOM_IS_VALID = 'ROOM_IS_VALID';
