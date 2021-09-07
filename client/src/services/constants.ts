import { io } from "socket.io-client";

export const socket = io("https://arcane-thicket-43676.herokuapp.com/", {
  transports: ["websocket", "polling"]
});

export enum ResponseStatus {
  ok = 200,
  error = 500
}

export const IS_ROOM_VALID = "IS_ROOM_VALID";
export const ROOM_IS_NOT_VALID = "ROOM_IS_NOT_VALID";
export const ROOM_IS_VALID = "ROOM_IS_VALID";

export const CREATE_ROOM = "CREATE_ROOM";

export const JOIN_ROOM = "JOIN_ROOM";
export const JOINED_ROOM = "JOINED_ROOM";
export const USER_CONNECTED = "USER_CONNECTED";
export const ROOM_NOT_FOUND = "ROOM_NOT_FOUND";

// Вот все events с бэка
export enum RoomEvents {
  createRoom = "CREATE_ROOM",
  isRoomValid = "IS_ROOM_VALID",
  roomNotFound = "ROOM_NOT_FOUND"
}

export enum ChatEvents {
  sendMessage = "SEND_MESSAGE",
  receiveMessage = "RECEIVE_MESSAGE"
}

export enum UserEvents {
  joinRoom = "JOIN_ROOM",
  leaveRoom = "LEAVE_ROOM",
  userConnected = "USER_CONNECTED",
  userLeft = "USER_LEFT",
  userDisconnected = "USER_DISCONNECTED",
  disconnecting = "disconnecting"
}

export enum KickUserEvents {
  kickUser = "KICK_USER",
  youAreKicked = "YOU_ARE_KICKED",
  userIsKicked = "USER_IS_KICKED",
  youAreDeleted = "YOU_ARE_DELETED",
  userIsDeleted = "USER_IS_DELETED",
  youAreNotDeleted = "YOU_ARE_NOT_DELETED",
  userIsNotDeleted = "USER_IS_NOT_DELETED",
  kickingVote = "KICKING_VOTE"
}
