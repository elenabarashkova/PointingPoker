#### PointingPoker-api

##### URL: https://arcane-thicket-43676.herokuapp.com/

###### The API is listening for the following events:

##### - CREATE_ROOM

##### Expected data

{ roomId: string, user : User }

User should have status: "master"

##### Success response

- event: **ROOM_WAS_CREATED**
- data: **roomStoreObject**

const initRoomStore = {
users: Users;
messages: [],
issues: [],
gameStatus: "pending" | "inProgress", | "finished" | "canceled",
gameSettings: initGameSettingsConfig,
}

const initGameSettingsConfig = {
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

##### - JOIN_ROOM

##### Expected data

{ roomId: string, user : User }

User should have status: "player" | "observer"

##### Success response if room exists

###### Joined user:

- event: **JOINED_ROOM**
- data: **currentRoomStoreObject**

###### Other users in this room:

- event: **USER_CONNECTED**
- data: **joinedUserId**, **joinedUserObject**

##### Response if room dos not exists

- event: **ROOM_NOT_FOUND**

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

##### - LEAVE_ROOM

##### Expected data

roomId: string

##### Success response

###### User who left the room:

- event: **LEFT_ROOM**

###### Other users in this room:

- event: **USER_LEFT**
- data: **userId: string** _(id of the user who left the room)_

##### Error response

- event: **error**
- data: **{ status: 500, message: "error" }**

---

##### For client app you can use socket.io-client
