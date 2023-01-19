import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import "./ChatContainer.scss";

const ChatContainer = (props) => {
  const { currentChat, socketRef } = props;
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const url= process.env.REACT_API_URL;
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    axios
      .post(`${url}/api/messages/getmsg`, {
        from: data._id,
        to: currentChat._id,
      })
      .then((res) => {
        setMessages(res.data);
      });
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("currentUser"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("currentUser"));
    socketRef.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    // const url = process.env.REACT_APP_API_URL;
    await axios.post(`${url}/api/messages/addmsg`, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("msg-recieve", (msg) => {
       
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid">
      <div className="chat-header grid-item-1">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages grid-item-2">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p style={{marginBottom:0}}>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-input grid-item-3">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
};


export default ChatContainer;
