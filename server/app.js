var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var reload = require("reload");

server.listen(8005);

app.use('/bower', express.static(__dirname + '/../bower_components'));
app.use('/assets', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  // a player wants to join
  socket.on('player', function (data) {
    console.log(data);
    socket.emit("player", data);
  });
});

reload(server, app)
