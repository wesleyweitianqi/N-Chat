import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Room = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    const socket = io();
    socket.on("connect", (res) => {
      console.log(res.body);
      socket.emit("login", { username: "wesley", password: 123 });
      socket.emit('send', {msg: data})
    });
  },[data])
  const changeHandler = (e)=> {
    e.preventDefault()
    setData(e.target.value)
  }
  const clickHandler = (e) => {
    e.preventDefault()
    console.log("clicked", data);
  };

  // const message = Array.isArray(data) && data.map((msg)=>{
  //   return (
  //       <li>msg</li>
  //   )
  // })

  return (
    <div className="form-floating">
      <h1>Chat Room 1</h1>
      <div className="msg-container">
       
      </div>
      <form>
        <textarea
          className="form-control"
          placeholder="Start Chatting"
          id="floatingTextarea"
          value={data}
          onChange={changeHandler}
        ></textarea>
        <button onClick={clickHandler}>Submit</button>
      </form>
    </div>
  );
};

export default Room;
