import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logo from "../doc/logo.svg";
import defaultAvatar from '../doc/defaultAvatar.png';
import axios from "axios";

export default function Contacts(props) {
  const { changeChat } = props;
 
  
  const [currentUserName, setCurrentUserName] = useState({ username: "" });
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [list, setList] = useState([])
  
 
 
  //get current user from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    if (data) {
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
      const serverUrl = process.env.REACT_APP_API_URL
      axios.get(`${serverUrl}/api/auth/allusers/${data._id}`).then((res) => {
        setList(res.data);
    })
    }
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
           {list.map((contact,index)=> {
            let avatarImg = `data:image/svg+xml;base64,${contact.avatarImage}`
            if (!contact.avatarImage) {
              avatarImg = defaultAvatar
            }
            return (<div
              key={index}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={avatarImg}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>)
           })}
           
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  position: relative;
  @media (max-wdith: 576px) {
    font-size: 0.5rem;
    img {
      height: 1rem;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    /* gap: 1rem; */
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.4rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3.5rem;
      width: 100%;
      cursor: pointer;
      border-radius: 0.2rem;
      display: flex;
      /* gap: 1rem; */
      align-items: center;
      transition: 0.5s ease-in-out;
      @media (max-width: 576px) {
        min-height: 1.5rem;
      }
      .avatar {
        img {
          @media (max-width: 576px) {
            height: 1.2rem;
          }
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          font-size: 1.2rem;
          color: white;
          @media (max-width: 576px) {
            overflow:hidden;
            font-size: 0.8rem;
            word-break: break-all;
            margin-bottom: 0;
          }
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    position: absolute;
    bottom: 0;
    height: 5rem;
    width: 100%;
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        font-size: 1.2rem;
        color: white;
      }
    }
  }
`;
