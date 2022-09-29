import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";
import { getAllUsersRoute } from "../utils/apiRoutes";

const Chat = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(()=> {
    if (!localStorage.getItem('username')) {
      navigate("/")
    }
    let user = JSON.parse(localStorage.getItem('username'));
    setCurrentUser(user);
  },[])

  useEffect(()=> {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${getAllUsersRoute}/${currentUser._id}`).then(res=> {
          setContacts(res.data)
        })
      } else {
        navigate('/setAvatar');
      }
    }
  },[currentUser])
 
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat}  />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
    height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`



export default Chat;
