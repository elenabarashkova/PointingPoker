import cors from "cors";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {
  ChatEvents,
  KickUserEvents,
  RoomEvents,
  UserEvents,
} from "./constants/events";
import { sendMessageHandler } from "./handlers/message";
import {
  checkRoomHandler,
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./handlers/room";
import { kickUserHandler, kickUserVotingHandler } from "./handlers/user";

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ["http://localhost:8080", "http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("Connected " + socket.id);

  socket.on(RoomEvents.createRoom, createRoomHandler(socket));
  socket.on(RoomEvents.isRoomValid, checkRoomHandler(socket));
  socket.on(UserEvents.joinRoom, joinRoomHandler(socket));
  socket.on(ChatEvents.sendMessage, sendMessageHandler(socket));
  socket.on(UserEvents.leaveRoom, leaveRoomHandler(socket));
  socket.on(KickUserEvents.kickUser, kickUserHandler(socket));
  socket.on(KickUserEvents.kickingVote, kickUserVotingHandler(socket, io));
});

server.listen(PORT, () => {
  console.log("Server is listen on PORT 5000");
});
