import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, getUser, deleteUser, getUsers, User } from './users';


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket) => {
  socket.on('login', ({ name, role, picture, room }, callback) => {
    const newUser = {
      id: socket.id,
      name,
      role,
      picture,
      room,
    };

    const { user, error } = addUser(newUser);

    if (error) {
      return callback(error)
    }

    socket.join(user!.room);

    socket.in(room).emit(
      'notification',
      { title: 'Someone\'s here', description: `${user!.name} just entered the room` }
    );

    io.in(room).emit('users', getUsers(room));
    callback();
  });

  // socket.on('sendMessage', message => {
  //   const user = getUser(socket.id);
  //
  //   io.in(user!.room).emit('message', { user: user!.name, text: message });
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);

    if (user) {
      io.in(user.room).emit(
        'notification',
        { title: 'Someone just left', description: `${user.name} just left the room`}
      );

      io.in(user.room).emit('users', getUsers(user.room));
    }
  })
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server is up and running')
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});



