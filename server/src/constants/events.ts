export enum RoomEvents {
  createRoom = "CREATE_ROOM",
  roomWasCreated = "ROOM_WAS_CREATED",
  isRoomValid = "IS_ROOM_VALID",
  roomIsValid = "ROOM_IS_VALID",
  roomIsNotValid = "ROOM_IS_NOT_VALID",
  roomNotFound = "ROOM_NOT_FOUND",
}

export enum ChatEvents {
  sendMessage = "SEND_MESSAGE",
  messageWasSent = "MESSAGE_WAS_SENT",
  receiveMessage = "RECEIVE_MESSAGE",
}

export enum UserEvents {
  joinRoom = "JOIN_ROOM",
  joinedRoom = "JOINED_ROOM",
  leaveRoom = "LEAVE_ROOM",
  leftRoom = "LEFT_ROOM",
  userConnected = "USER_CONNECTED",
  userLeft = "USER_LEFT",
  userDisconnected = "USER_DISCONNECTED",
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
