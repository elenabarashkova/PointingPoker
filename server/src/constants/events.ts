export enum RoomEvents {
  createRoom = 'CREATE_ROOM',
  isRoomValid = 'IS_ROOM_VALID',
  roomNotFound = 'ROOM_NOT_FOUND',
}

export enum ChatEvents {
  sendMessage = 'SEND_MESSAGE',
  receiveMessage = 'RECEIVE_MESSAGE',
}

export enum UserEvents {
  joinRoom = 'JOIN_ROOM',
  leaveRoom = 'LEAVE_ROOM',
  userConnected = 'USER_CONNECTED',
  userLeft = 'USER_LEFT',
  userDisconnected = 'USER_DISCONNECTED',
  disconnecting = 'disconnecting',
  reconnected = 'RECONNECTED',
  userReconnected = 'USER_RECONNECTED',
}

export enum KickUserEvents {
  kickUser = 'KICK_USER',
  deleteUser = 'DELETE_USER',
  youAreKicked = 'YOU_ARE_KICKED',
  userIsKicked = 'USER_IS_KICKED',
  youAreDeleted = 'YOU_ARE_DELETED',
  userIsDeleted = 'USER_IS_DELETED',
  youAreNotDeleted = 'YOU_ARE_NOT_DELETED',
  userIsNotDeleted = 'USER_IS_NOT_DELETED',
  kickingVote = 'KICKING_VOTE',
  KICK_VOTING_ERROR = 'KICK_VOTING_ERROR',
}

export enum GameEvents {
  changeGameSettings = 'CHANGE_GAME_SETTINGS',
  gameSettingsChanged = 'GAME_SETTINGS_CHANGED',
  changeGameStatus = 'CHANGE_GAME_STATUS',
  gameStatusChanged = 'GAME_STATUS_CHANGED',
  startGame = 'START_GAME',
  gameIsStarted = 'GAME_IS_STARTED',
  activateIssue = 'ACTIVATE_ISSUE',
  issueIsActive = 'ISSUE_IS_ACTIVE',
  issueVote = 'ISSUE_VOTE',
  userHasVoted = 'USER_HAS_VOTED',
  issueVotingResult = 'ISSUE_VOTING_RESULT',
  finishGame = 'FINISH_GAME',
  stopGame = 'STOP_GAME',
  startRound = 'START_ROUND',
  roundIsStarted = 'ROUND_IS_STARTED',
  stopRound = 'STOP_ROUND',
  roundIsStopped = 'ROUND_IS_STOPPED',
  setFinalVote = 'SET_FINAL_VOTE',
  finalVote = 'FINAL_VOTE',
}

export enum IssueEvents {
  addIssue = 'ADD_ISSUE',
  issueHasBeenAdded = 'ISSUE_HAS_BEEN_ADDED',
  deleteIssue = 'DELETE_ISSUE',
  issueHasBeenDeleted = 'ISSUE_HAS_BEEN_DELETED',
  updateIssue = 'UPDATE_ISSUE',
  issueHasBeenUpdated = 'ISSUE_HAS_BEEN_UPDATED',
}
