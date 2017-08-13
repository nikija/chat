var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});


// app.get('/', function(req, res){
// res.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static('public'));

//We can see a messge that a user is connected when one does so
//We are listening for 'chat message' events and sending received to everybody connected to the socket
//if a user disconects, we get the message
io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//Listening
http.listen(3000, function(){
  console.log('Magic happens on port 3000');
});