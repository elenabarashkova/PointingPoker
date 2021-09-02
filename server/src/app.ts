import * as express from 'express';

const app = express();
const http = require('http').Server(app);
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});