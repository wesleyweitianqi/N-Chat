import React from "react";
import io from 'socket.io-client';

const socket =io();
socket.on('connect', ()=> {
  socket.emit('login',{username: "wesley", password: 123})
})
const Room =()=> {
  return (
    <h1>Chat Room 1</h1>
  )
}

export default Room;