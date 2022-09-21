require('dotenv').config()
const {PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socketio(server)


io.on('connection', ()=> {
  console.log("someone connected")
})

app.use(morgan("tiny"));
app.use(bodyParser.json());

// const catRouter = require("./routes/catsRoutes")
// app.use('/cats', catRouter)
app.get("/", (req, res)=> {
  res.status(200).send("Welcome to Chat")
})

server.listen(PORT, ()=> console.log(`Server is listenning on port ${PORT}`));