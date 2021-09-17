#### PointingPoker-api

##### URL: https://arcane-thicket-43676.herokuapp.com/

---

### The API is listening for the following events:

##### - CREATE_ROOM

##### Expected data

user: User

User should have role: "master"

##### On client side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("CREATE_ROOM", user, (response) => { console.log(response) });

##### Success response

{status: 200, data: {room: roomStoreObject, roomId: string}}

##### Error response

{status: 500, error: "error"}

---

##### - IS_ROOM_VALID

##### Expected data

roomId: string

##### On client side you can add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("IS_ROOM_VALID", roomId, (response) => { console.log(response) });

##### Success response

{status: 200, data: true/false}

##### Error response

{status: 500, error: "error"}

---

##### - JOIN_ROOM

##### Expected data

{ roomId: string, user : User }

User should have role: "player" | "observer"

###### Joined user:

##### On joined user side you can add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("JOINED_ROOM", { roomId: string, user : User, userId: string }, (response) => { console.log(response) });

##### Response

- If room exists: **{ status: 200, data: { room: roomStore, roomId: string, userId: string } }**
- If room doesn't exists: **{ status: 404, data: "Room not found" }**

##### Error response

{status: 500, error: "error"}

###### Other users in this room should listen event:

- event: **USER_CONNECTED**
- data: **{userId: joinedUserId, user: joinedUserObject}**

---

##### - LEAVE_ROOM

##### Expected data

roomId: string

##### On user side you can add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("LEAVE_ROOM", roomId, (response) => { console.log(response) });

##### Response

{ status: 200, data: { userId: string, user: User } }

##### Error response

{status: 500, error: "error"}

###### Other users in this room should listen event:

- event: **USER_LEFT**
- data: **{ userId: leftUserId, user: leftUserObj }** _Left User has status "left"_

---

##### - DELETE_USER

##### Expected data

{userId: string, roomId: string}

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("DELETE_USER", { userId, roomId }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { userId: string, user: updatedUser } }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **USER_IS_DELETED**
- data: **{userId: string, user: updatedUser}**

---

##### - KICK_USER

##### Expected data

{userId: user who you wont to kick, roomId: string}

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("KICK_USER", { userId, roomId }, (response) => { console.log(response) });

##### Success response if user can be kicked

{ status: 200, data: { kickedUserId: string, kickedUser: kickedUserObject} }

##### Success response if user can not be kicked

{ status: 403, data: 'User can not be kicked' }

##### Error response

{ status: 500, error: "error" }

###### IF RESPONSE WAS SUCCESS

###### Kicked user:

- event: **YOU_ARE_KICKED**
- data: **{ kickInitiator: string, kickedUserId: string, kickedUser: kickedUserObject}** _Kicked User has status "kicked"_

###### Other users in this room:

- event: **USER_IS_KICKED**
- data: **{ kickInitiator: string, kickedUserId: string, kickedUser: kickedUserObject}** _Kicked User has status "kicked"_

##### Master can not be kicked, user cannot kick himself!

---

##### - KICKING_VOTE

##### Expected data

{ confirm: true/false, roomId: string, kickedUserId: string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("KICKING_VOTE", { confirm, roomId, kickedUserId }, (response) => { console.log(response) });

##### Success response

callback({ status: 200, data: 'Your vote is accepted' });

##### Error response

{ status: 500, error: "error" }

##### IF ALL USERS HAVE VOTED AND THEY DECIDED TO DELETE USER

###### Kicked user:

- event: **YOU_ARE_DELETED**
- data: **{ userId: deletedUserId, user: deletedUserObject}** _Deleted User has status "deleted"_

###### Other users in this room:

- event: **USER_IS_DELETED**
- data: **{ userId: deletedUserId, user: deletedUserObject}** _Deleted User has status "deleted"_

IF ALL USERS HAVE VOTED BUT THEY DECIDED NOT TO DELETE USER

###### Kicked user:

- event: **YOU_ARE_NOT_DELETED**
- data: **{ userId: string, user: userObject}** _/User has status "active"_

###### Other users in this room:

- event: **USER_IS_NOT_DELETED**
- data: **{ userId: string, user: userObject}** _/User has status "active"_

##### IF SOMETHING WENT WRONG WITH THE VOTE ALL USERS IN THE ROOM WILL RECEIVE:

- event: **KICK_VOTING_ERROR**
- data: **{ status: 500, message: "Voting error, user is not deleted" }**

---

##### - SEND_MESSAGE

##### Expected data

{ roomId: string, text : string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("SEND_MESSAGE", { roomId, text }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: {userId: string, text: string, messageId: string} }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **RECEIVE_MESSAGE**
- data: **{userId: string, text: string, messageId: string}**

---

##### - CHANGE_GAME_SETTINGS

##### Expected data

{ roomId: string, settings : {gameSettings} }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("CHANGE_GAME_SETTINGS", { roomId, settings }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: {updatedGameSettings} }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **GAME_SETTINGS_CHANGED**
- data: **{gameSettings}**

---

##### - CHANGE_GAME_STATUS

##### Expected data

{ roomId: string, gameStatus : string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("CHANGE_GAME_STATUS", { roomId, newStatus }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: gameStatus }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **GAME_STATUS_CHANGED**
- data: **gameStatus**

---

##### - ADD_ISSUE

##### Expected data

{ roomId: string, issue : Issue }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("ADD_ISSUE", { roomId, issue }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: {issueId, issue}}

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **ISSUE_HAS_BEEN_ADDED**
- data: **{issueId, issue}**

---

##### - DELETE_ISSUE

##### Expected data

{ roomId: string, issueId : string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("DELETE_ISSUE", { roomId, issueId }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: deletedIssueId }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **ISSUE_HAS_BEEN_DELETED**
- data: **deletedIssueId**

---

##### - UPDATE_ISSUE

##### Expected data

{ roomId: string, issueId : string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("UPDATE_ISSUE", { roomId, issueId }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { issueId, issue } }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **ISSUE_HAS_BEEN_UPDATED**
- data: **{ issueId, issue }**

---

---

##### - IF USER DISCONNECTS (due to network problems):

###### Other users in this room should listen event:

- event: **USER_DISCONNECTED**
- data: **{ disconnectedUserId, disconnectedUser }**

---

---

##### - IF USER RECONNECTS:

###### On client side you should listen 'reconnect' event and then send to the server 'RECONNECTED' event:

socket.emit("RECONNECTED", (response) => { console.log(response) });

##### Success response

{ newUserId, user, room }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **USER_RECONNECTED**
- data: **{ newUserId, user, messages}**

---

---

##### - START_GAME

##### Expected data

{ roomId: string, issueId : string (first Issue Id) }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("START_GAME", { roomId, issueId }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { gameStatus: "active", issueId: active issue id, issue: active issue object } }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **GAME_IS_STARTED**
- data: **{ gameStatus: "active", issueId, issue }**

---

##### - START_ROUND

##### Expected data

{ roomId: string, issueId: string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("START_ROUND", { roomId, issueId }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { currentRound: {issueId: string} }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **ROUND_IS_STARTED**
- data: **currentRound: {issueId: string}**

---

##### - STOP_ROUND

##### Expected data

roomId: string

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("STOP_ROUND", roomId, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { currentRound: null, issue: Issue}

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **ROUND_IS_STOPPED**
- data: **{ currentRound: null, issue: Issue}**

---

##### - ACTIVATE_ISSUE

##### Expected data

{ roomId: string, issueId : string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("ACTIVATE_ISSUE", { roomId, issueId }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { issueId, issue } }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **ISSUE_IS_ACTIVE**
- data: **{ issueId, issue }**

---

##### - ISSUE_VOTE

##### Expected data

{ roomId: string, issueId : string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("ISSUE_VOTE", { roomId, issueId, vote }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { issueId, issue } }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **USER_HAS_VOTED**
- data: **{ issueId, issue }**

---

##### - SET_FINAL_VOTE

##### Expected data

{ roomId: string, issueId: string, finalVote: string }

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("SET_FINAL_VOTE", { roomId, issueId, finalVote }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: { currentRound: null, issue: Issue}

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **FINAL_VOTE**
- data: **{ currentRound: null, issue: Issue}**

---

---

##### For client app you can use socket.io-client
