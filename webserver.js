const express = require('express');
const app = express();const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {  
    console.log('a user connected');  
    socket.on('disconnect', () => {    
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (usr,msg) => {
        io.emit('chat message', usr, msg);
        console.log(usr+': ' + msg);
    });
  });

server.listen(8080, () => {  
    console.log('listening on *:8080');
});