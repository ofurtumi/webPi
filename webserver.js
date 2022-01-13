const express = require('express');
const app = express();const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let history = []

app.use(express.static('public'))

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {  
    console.log('a user connected');
    io.to(socket.id).emit('clear page')
    history.forEach(e => {
        io.to(socket.id).emit('chat message', e.user, e.message, e.time)
    });
    socket.on('disconnect', () => {    
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (usr,msg, time) => {
        io.emit('chat message', usr, msg, time);
        console.log('[' + time + '] ' + usr+': ' + msg);
        history.push({"time":time,"user":usr,"message":msg})
    });
});

server.listen(80, () => {  
    console.log('listening on *:80');
});


// const fs = require("fs");
// let historyjson = fs.readFileSync("./public/history.json","utf-8");
// let historyarray = JSON.parse(historyjson)
// let message = {"time":time,"user":usr,"message":msg}
// historyarray.push(message)
// historyjson = JSON.stringify(historyarray)
// fs.writeFileSync("./public/history.json",historyjson,"utf-8");