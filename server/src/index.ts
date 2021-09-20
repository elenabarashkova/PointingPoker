import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import {
  ChatEvents,
  GameEvents,
  IssueEvents,
  KickUserEvents,
  RoomEvents,
  UserEvents
} from './constants/events';
import { gameStatusHandler } from './handlers/game/gameStatus';
import { gameTitleHandler } from './handlers/game/gameTitle';
import { setFinalVoteHandler } from './handlers/game/setFinalVote';
import { gameSettingsHandler } from './handlers/game/settings';
import { startRoundHandler } from './handlers/game/startRound';
import { stopRoundHandler } from './handlers/game/stopRound';
import { voteHandler } from './handlers/game/vote';
import { addIssueHandler } from './handlers/issues/add';
import { deleteIssueHandler } from './handlers/issues/delete';
import { updateIssueHandler } from './handlers/issues/update';
import { sendMessageHandler } from './handlers/message';
import { checkRoomHandler, createRoomHandler } from './handlers/room';
import { accessConfirmationHandler } from './handlers/room/accessConfirmation';
import { deleteUserHandler } from './handlers/user/delete';
import { userDisconnectionHandler } from './handlers/user/disconnection';
import { joinRoomHandler } from './handlers/user/joinRoom';
import { kickUserHandler } from './handlers/user/kick';
import { kickUserVotingHandler } from './handlers/user/kickVote';
import { leaveRoomHandler } from './handlers/user/leaveRoom';
import { userReconnectingHandler } from './handlers/user/reconnecting';

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

const server = createServer(app);
const io = new Server(server);
// const io = new Server(server, {
//   maxHttpBufferSize: 1e8,
// });

io.on('connection', (socket: Socket) => {
  console.log('Connected ' + socket.id);

  // const roomData = socket.rooms.values();
  // const [id, roomId] = roomData;
  // socket.emit('YOU ARE CONNECTED', id, roomId);

  socket.on(RoomEvents.createRoom, createRoomHandler(socket));
  socket.on(RoomEvents.isRoomValid, checkRoomHandler(socket));
  socket.on(UserEvents.joinRoom, joinRoomHandler(socket));
  socket.on(ChatEvents.sendMessage, sendMessageHandler(socket));
  socket.on(UserEvents.leaveRoom, leaveRoomHandler(socket));
  socket.on(KickUserEvents.kickUser, kickUserHandler(socket));
  socket.on(KickUserEvents.kickingVote, kickUserVotingHandler(io, socket));
  socket.on(GameEvents.changeGameSettings, gameSettingsHandler(socket));
  socket.on(GameEvents.changeGameStatus, gameStatusHandler(socket));
  socket.on(KickUserEvents.deleteUser, deleteUserHandler(socket));
  socket.on(IssueEvents.addIssue, addIssueHandler(socket));
  socket.on(IssueEvents.deleteIssue, deleteIssueHandler(socket));
  socket.on(IssueEvents.updateIssue, updateIssueHandler(socket));
  socket.on(UserEvents.disconnecting, userDisconnectionHandler(socket));
  socket.on(UserEvents.reconnected, userReconnectingHandler(socket));
  socket.on(GameEvents.issueVote, voteHandler(socket));
  socket.on(GameEvents.startRound, startRoundHandler(socket));
  socket.on(GameEvents.stopRound, stopRoundHandler(socket));
  socket.on(GameEvents.setFinalVote, setFinalVoteHandler(socket));
  socket.on(GameEvents.changeGameTitle, gameTitleHandler(socket));
  socket.on(
    RoomEvents.accessConfirmation,
    accessConfirmationHandler(io, socket)
  );
});

server.listen(PORT, () => {
  console.log('Server is listen on PORT 5000');
});
