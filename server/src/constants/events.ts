export enum RoomEvents {
  createRoom = "CREATE_ROOM",
  isRoomValid = "IS_ROOM_VALID",
  roomNotFound = "ROOM_NOT_FOUND",
}

export enum ChatEvents {
  sendMessage = "SEND_MESSAGE",
  receiveMessage = "RECEIVE_MESSAGE",
}

export enum UserEvents {
  joinRoom = "JOIN_ROOM",
  leaveRoom = "LEAVE_ROOM",
  userConnected = "USER_CONNECTED",
  userLeft = "USER_LEFT",
  userDisconnected = "USER_DISCONNECTED",
  disconnecting = "disconnecting",
}

export enum KickUserEvents {
  kickUser = "KICK_USER",
  youAreKicked = "YOU_ARE_KICKED",
  userIsKicked = "USER_IS_KICKED",
  youAreDeleted = "YOU_ARE_DELETED",
  userIsDeleted = "USER_IS_DELETED",
  youAreNotDeleted = "YOU_ARE_NOT_DELETED",
  userIsNotDeleted = "USER_IS_NOT_DELETED",
  kickingVote = "KICKING_VOTE",
}
