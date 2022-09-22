require('dotenv').config()
const {PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const { Socket } = require('dgram');
const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/static'))


let count = 0;
let chatRoomData=[];
let connnectedClients={};

io.on('connection', (client)=> {
  console.log("New client connnected")

  client.on('login', (data)=> {
    console.log(data)
    connnectedClients.username = data.username;
    count++
    io.emit('count', count)
    io.emit('msg', {name: data.username, msg: 'successfully connected'+(new Date())})
  })

  client.on('send', (req,res)=> {
    console.log('message from client');
    io.emit('msg', {name: client.username, msg: res});
  })

  client.on('disconnect', ()=> {
    count--;
    io.emit('count', count)
  })
})


// const catRouter = require("./routes/catsRoutes")
// app.use('/cats', catRouter)
app.get("/", (req, res)=> {
  res.status(200).send("Welcome to Chat")
})

server.listen(PORT, ()=> console.log(`Server is listenning on port ${PORT}`));