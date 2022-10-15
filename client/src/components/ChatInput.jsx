import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import "./ChatInput.scss";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    console.log(emojiObject);
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      {showEmojiPicker && (
        <Picker height={400} width={300} onEmojiClick={handleEmojiClick} />
      )}
      <div className="input-grid">
        <div className="button-container">
          <div className="emoji">
            <div className="Bs">
              <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
            </div>
          </div>
        </div>
       
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <input
            className="input"
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className="submitBtn" type="submit">
            <IoMdSend />
          </button>
        </form>
        
      </div>
    </>
  );
}

// const Container = styled.div`
// position: relative;
// bottom: 10px;
//   width:100%;
//   height: 10vh;
//   display: grid;
//   align-items: center;
//   grid-template-columns: 5% 95%;
//   padding:10px;
//   background-color: #130f28;
//   padding: 0 2rem;
//   /* @media screen and (min-width: 720px) and (max-width: 1080px) {
//     padding: 0 1rem;
//     gap: 1rem;
//   } */

//   .button-container {
//     position:sticky;
//     display: flex;
//     flex-direction:rows;
//     align-items: center;
//     color: white;
//     gap: 1rem;
//   }
//   .emoji {
//     .Bs {
//       position: relative;
//       left: 20px;
//       /* bottom:10%; */

//     }

//     svg {
//       font-size: 1.5rem;
//       color: #ffff00c8;
//       cursor: pointer;
//     }
//     aside.EmojiPickerReact.epr-main {
//       top:-300px;
//     }
//     .emoji-picker-react {
//       position: absolute;
//       top:200px;

//       background-color: #080420;
//       box-shadow: 0 5px 10px #9a86f3;
//       border-color: #9a86f3;
//       .emoji-scroll-wrapper::-webkit-scrollbar {
//         background-color: #080420;
//         width: 5px;
//         &-thumb {
//           background-color: #9a86f3;
//         }
//       }

//       .emoji-categories {
//         button {
//           filter: contrast(0);
//         }
//       }
//       .emoji-search {
//         background-color: transparent;
//         border-color: #9a86f3;
//       }
//       .emoji-group:before {
//         background-color: #080420;
//       }
//     }
//   }
//   .input-container {
//     position:sticky;
//     left:10%;
//     width:55vw;
//     height:45px;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     background-color: #ffffff34;
//     input {
//       width: 90%;
//       height: 60%;
//       background-color: transparent;
//       color: white;
//       border: none;
//       padding-left: 1rem;
//       font-size: 1.2rem;
//       &::selection {
//         background-color: #9a86f3;
//       }
//       &:focus {
//         outline: none;
//       }
//     }
//     button {
//       position:relative;
//       right:0;
//       padding: 0.3rem 2rem;
//       border-radius: 2rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       background-color: #9a86f3;
//       border: none;

//       svg {
//         font-size: 2rem;
//         color: white;
//       }
//       &:hover {
//         background-color: purple;
//       }
//     }
//   }
// `;
