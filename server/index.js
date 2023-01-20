require('dotenv').config()
const {PORT} = process.env;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const messageRoute = require('./routes/messageRoute');
const usersRoute = require('./routes/users');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);


const io = socketio(server, {
  cors: {
    origin:"http://n-chat-one.vercel.app",
    Credentials:true
  }
})

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname+'/static'))
app.use("/api/auth", authRoutes)
app.use("/api/getallusers", usersRoute);
app.use('/api/messages', messageRoute);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log("mongodb connected")
}).catch((err)=>console.error(err))

let count = 0;
let chatRoomData=[];
let connnectedsockets={};

const sockets = new Map();
io.on('connection', (socket)=> {
  console.log("New socket connnected", socket.id)
  socket.on('add-user', (userId)=> {
    sockets.set(userId, socket.id)
  })
  
  socket.on('send-msg', (data)=> {
    const sendUserSocket = sockets.get(data.to)
    if (sendUserSocket) {
      console.log(sendUserSocket)
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  })

})

app.get("/", (req, res)=> {
  res.status(200).send("Welcome to Chat")
})

server.listen(process.env.PORT, ()=> console.log(`Server is listenning on port ${PORT}`));

module.exports = app;