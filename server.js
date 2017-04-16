var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static('public'));

server.listen(process.env.PORT || 3000);
console.log('Server Running...');

io.sockets.on('connection', function(socket) {
  console.log('Socket Connected...');

  // send message
  socket.on('send message', function (data) {
    io.sockets.emit('new message', {msg: data});
  });
});