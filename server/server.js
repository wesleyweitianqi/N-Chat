require('dotenv').config()
const {PORT} = process.env;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const messageRoute = require('./routes/messageRoute')
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname+'/static'))
app.use("/api/auth", authRoutes)
app.use('/api/messages', messageRoute);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log("mongodb connected")
}).catch((err)=>console.error(err))

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

server.listen(process.env.PORT, ()=> console.log(`Server is listenning on port ${PORT}`));