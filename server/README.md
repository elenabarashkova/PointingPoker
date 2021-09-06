#### PointingPoker-api

##### URL: https://arcane-thicket-43676.herokuapp.com/

---

### The API is listening for the following events:

##### - CREATE_ROOM

##### Expected data

user: User

User should have role: "master"

##### Success response

- event: **ROOM_WAS_CREATED**
- data: **{room: roomStoreObject, roomID: string}**

const initialRoomStore = {
users: [];
messages: [],
issues: [],
gameStatus: "pending" | "inProgress", | "finished" | "canceled",
gameSettings: initialGameSettingsConfig,
}

const initialGameSettingsConfig = {
masterAsPlayer: true,
changingCardInRoundEnd: false,
timer: true,
scoreType: ScoreType.storyPoint,
roundTime: 140
}

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

---

##### - IS_ROOM_VALID

##### Expected data

roomId: string

##### Success response if room exists

- event: **ROOM_IS_VALID**
- data: **roomID: string**

##### Success response if room dos not exists

- event: **ROOM_IS_NOT_VALID**

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

##### After success or error response user will disconnect

- event: **disconnect**

---

##### - JOIN_ROOM

##### Expected data

{ roomId: string, user : User }

User should have role: "player" | "observer"

##### Success response if room exists

###### Joined user:

- event: **JOINED_ROOM**
- data: **{room: roomStoreObject, roomID: string}**

###### Other users in this room:

- event: **USER_CONNECTED**
- data: **{userId: joinedUserId, user: joinedUserObject}**

##### Response if room dos not exists

- event: **ROOM_NOT_FOUND**

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

---

##### - LEAVE_ROOM

##### Expected data

roomId: string

##### Success response

###### User who left the room:

- event: **LEFT_ROOM**
- data: **{ userId: leftUserId, user: leftUserObj }** _Left User has status "left"_

###### Other users in this room:

- event: **USER_LEFT**
- data: **{ userId: leftUserId, user: leftUserObj }** _Left User has status "left"_

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

---

##### - KICK_USER

##### Expected data

{userId: string, roomId: string}

##### Success response

###### Kicked user:

- event: **YOU_ARE_KICKED**
- data: **{ userId: kickedUserId, user: kickedUserObject}** _Kicked User has status "kicked"_

###### Other users in this room:

- event: **USER_IS_KICKED**
- data: **{userId: kickedUserId, user: kickedUserObject}** _Kicked User has status "kicked"_

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

##### Master can not be kicked, user cannot kick himself!

---

##### - KICKING_VOTE

##### Expected data

{ confirm: true/false, roomId: string, kickedUserId: string }

##### Success response

IF ALL USERS HAVE VOTED AND THEY DECIDED TO DELETE USER

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

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

---

##### - SEND_MESSAGE

##### Expected data

{ roomId: string, text : string }

##### Success response

###### User who sent the message:

- event: **MESSAGE_WAS_SENT**
- data: **{userId: string, text: string}**

###### Other users in this room:

- event: **RECEIVE_MESSAGE**
- data: **{userId: string, text: string}**

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

---

##### For client app you can use socket.io-client
