import * as express from 'express';
import * as path from 'path';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '') });
});

const io = new Server(http);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect',  () => {
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});



