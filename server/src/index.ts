import cors from "cors";
import express from "express";
import { createServer } from "http";
import redis from "redis";
import { Server, Socket } from "socket.io";
import { promisify } from "util";
import {
  ChatEvents,
  GameEvents,
  IssueEvents,
  KickUserEvents,
  RoomEvents,
  UserEvents,
} from "./constants/events";
import { gameStatusHandler } from "./handlers/game/gameStatus";
import { gameSettingsHandler } from "./handlers/game/settings";
import { addIssueHandler } from "./handlers/issues/add";
import { deleteIssueHandler } from "./handlers/issues/delete";
import { updateIssueHandler } from "./handlers/issues/update";
import { sendMessageHandler } from "./handlers/message";
import { checkRoomHandler, createRoomHandler } from "./handlers/room";
import { deleteUserHandler } from "./handlers/user/delete";
import { joinRoomHandler } from "./handlers/user/joinRoom";
import { kickUserHandler } from "./handlers/user/kick";
import { kickUserVotingHandler } from "./handlers/user/kickVote";
import { leaveRoomHandler } from "./handlers/user/leaveRoom";
import secret from "./secret";
import { HandlerParams } from "./types";

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ["http://localhost:8080", "http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

const server = createServer(app);
const io = new Server(server);
// const io = new Server(server, {
//   maxHttpBufferSize: 1e8,
// });
const client = redis.createClient(secret);

const redisGetAsync = promisify(client.get).bind(client);
const redisSetAsync = promisify(client.set).bind(client);

io.on("connection", (socket: Socket) => {
  console.log("Connected " + socket.id);
  const params: HandlerParams = { socket, redisGetAsync, redisSetAsync };

  socket.on(RoomEvents.createRoom, createRoomHandler(params));
  socket.on(RoomEvents.isRoomValid, checkRoomHandler(params));
  socket.on(UserEvents.joinRoom, joinRoomHandler(params));
  socket.on(ChatEvents.sendMessage, sendMessageHandler(params));
  socket.on(UserEvents.leaveRoom, leaveRoomHandler(params));
  socket.on(KickUserEvents.kickUser, kickUserHandler(params));
  socket.on(KickUserEvents.kickingVote, kickUserVotingHandler(io, params));
  socket.on(GameEvents.changeGameSettings, gameSettingsHandler(params));
  socket.on(GameEvents.changeGameStatus, gameStatusHandler(params));
  socket.on(KickUserEvents.deleteUser, deleteUserHandler(params));
  socket.on(IssueEvents.addIssue, addIssueHandler(params));
  socket.on(IssueEvents.deleteIssue, deleteIssueHandler(params));
  socket.on(IssueEvents.updateIssue, updateIssueHandler(params));
  // socket.on(UserEvents.disconnecting, disconnectingUserHandler(socket));
});

server.listen(PORT, () => {
  console.log("Server is listen on PORT 5000");
});
