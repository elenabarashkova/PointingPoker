import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, SEND_MESSAGE } from "./events";
import {
  getCreateRoomHandler,
  getJoinRoomHandler,
  getLeaveRoomHandler,
  getSendMessageHandler,
} from "./handlers";

const server = createServer();
const io = new Server(server, { path: "/" });

io.on("connection", (socket: Socket) => {
  console.log("Connected " + socket.id);

  socket.on(CREATE_ROOM, getCreateRoomHandler(socket));
  socket.on(JOIN_ROOM, getJoinRoomHandler(socket));
  socket.on(SEND_MESSAGE, getSendMessageHandler(socket));
  socket.on(LEAVE_ROOM, getLeaveRoomHandler(socket));
});

server.listen(4000, () => {
  console.log("Server is listen on PORT 4000");
});
