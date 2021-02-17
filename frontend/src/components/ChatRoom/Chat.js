import React, { useState } from "react";

/* Components */
import Modal from "./ModalGifs";

/* Styles */
import "./chat.css";

const Chat = (props) => {
  const [show, setShow] = useState(false);
  const [gifs, setGifs] = useState([]);

  const getGifs = (e) => {
    props.setMessage("");
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=bHQ3e4OvEpB1yAOqNWp84iaTQW3HQH4R&limit=12&rating=g"
    ).then((response) => {
      response.json().then((data) => {
        setShow(true);
        setGifs(data.data);
      });
    });
  };
  return (
    <div className="chat__container">
      <div className="chat__form">
        <textarea
          placeholder="Write your message here!"
          name=""
          id=""
          cols="30"
          rows="10"
          value={props.message}
          onChange={(e) =>
            e.target.value !== "/giphy"
              ? props.setMessage(e.target.value)
              : getGifs(e)
          }
          onKeyPress={(e) => (e.key === "Enter" ? props.sendMessage(e) : null)}
        ></textarea>
        <div className="chat__wrapper-btn">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              props.sendMessage(e);
            }}
          >
            <i className="far fa-paper-plane"></i> Send
          </button>
          <Modal
            show={show}
            setShow={setShow}
            gifs={gifs}
            gifClick={props.gifClick}
          ></Modal>
        </div>
      </div>
    </div>
  );
};
export default Chat;
