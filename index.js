var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var player1 = null
var player2 = null

io.on('connection', function(socket){
  if(!player1) {
    player1 = socket.id
    socket.emit('game', "P1")
  } else if(!player2) {
    player2 = socket.id
    socket.emit('game', "P2")
  }

  if(player1 && player2) {
    io.sockets.emit('START', 'START')
  }

  socket.on('P1' , function(data) {
    socket.to(player2).emit('in', data)
  })

  socket.on('P2' , function(data) {
    socket.to(player1).emit('in', data)
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})

    