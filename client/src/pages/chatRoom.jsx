import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";
import { getAllUsersRoute } from "../utils/apiRoutes";
import { io } from "socket.io-client";
import "./chatRoom.scss";
const dotenv = require('dotenv');
const env = dotenv.config()

const Chat = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const socketRef = useRef();
  const host = process.env.REACT_APP_API_URL;
  console.log("🚀 ~ file: chatRoom.jsx:21 ~ Chat ~ host", host);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
    }
    let user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${getAllUsersRoute}/${currentUser._id}`).then((res) => {
          setContacts([...contacts, res.data]);
        });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io("http://localhost:8000"); //socket connection
      socketRef.current.emit("add-user", currentUser._id); //send message to server with userID
    }
  }, [currentUser]);
  return (
    <div className="container-fluid">
      <div className="chat-container">
        <div className="container">
          <Contacts
            className=" grid-item-1"
            contacts={contacts}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome className="grid-item-2" />
          ) : (
            <ChatContainer
              className="grid-item-2"
              currentChat={currentChat}
              socketRef={socketRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
