import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, SEND_MESSAGE } from "./events";
import { sendMessageHandler } from "./handlers/message";
import {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./handlers/room";

const server = createServer();

const io = new Server(server, {
  path: "/",
  cors: {
    origin: "http://localhost:8080",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Connected " + socket.id);

  socket.on(CREATE_ROOM, createRoomHandler(socket));
  socket.on(JOIN_ROOM, joinRoomHandler(socket));
  socket.on(SEND_MESSAGE, sendMessageHandler(socket));
  socket.on(LEAVE_ROOM, leaveRoomHandler(socket));
});

server.listen(4000, () => {
  console.log("Server is listen on PORT 4000");
});
