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
      <div className="container-fluid">
        <div className="row">
          <div className="col-1">
            <div className="emoji">
              <div className="Bs">
                <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
              </div>
            </div>
          </div>
          <div className="col-10">
            <form
              className="input-container"
              onSubmit={(event) => sendChat(event)}
            >
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
        </div>
      </div>
    </>
  );
}
