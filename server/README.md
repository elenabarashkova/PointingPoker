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

{status: 200, data: {room: roomStoreObject, roomID: string}}

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

##### After success or error response user will disconnect

- event: **disconnect**

---

##### - JOIN_ROOM

##### Expected data

{ roomId: string, user : User }

User should have role: "player" | "observer"

###### Joined user:

##### On joined user side you can add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("JOINED_ROOM", { roomId: string, user : User }, (response) => { console.log(response) });

##### Response

- If room exists: **{ status: 200, data: { room: roomStore, roomId } }**
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

##### On user side you should add a callback as the last argument of the emit(), and this callback will be called once the server side acknowledges the event:

socket.emit("SEND_MESSAGE", { roomId, text }, (response) => { console.log(response) });

##### Success response

{ status: 200, data: {userId: string, text: string} }

##### Error response

{ status: 500, error: "error" }

###### Other users in this room should listen event:

- event: **RECEIVE_MESSAGE**
- data: **{userId: string, text: string}**

---

##### For client app you can use socket.io-client
