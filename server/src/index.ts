import cors from "cors";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, SEND_MESSAGE } from "./events";
import { sendMessageHandler } from "./handlers/message";
import {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./handlers/room";

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

  socket.on(CREATE_ROOM, createRoomHandler(socket));
  socket.on(JOIN_ROOM, joinRoomHandler(socket));
  socket.on(SEND_MESSAGE, sendMessageHandler(socket));
  socket.on(LEAVE_ROOM, leaveRoomHandler(socket));
});

server.listen(PORT, () => {
  console.log("Server is listen on PORT 4000");
});
