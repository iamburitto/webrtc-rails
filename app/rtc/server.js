var http = require('http'); // To use the HTTP server and client
// createServer Returns a new web server object
var app = http.createServer(function (req, res) {
}).listen(2013);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket){

  socket.on('message', function (data) {
    io.sockets.in(data.room).emit('message', data);
  });

  socket.on('create or join', function (room) {
    var numClients = io.sockets.clients(room).length;

    console.log('clients', numClients);

    if(numClients == 0){
      socket.join(room);
      socket.emit('created');
    } else if (numClients == 1){
      socket.join(room);
      io.sockets.in(room).emit('joined');
    } else {
      socket.emit('full');
    }
  })
});
