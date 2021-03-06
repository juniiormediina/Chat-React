import React, { useState } from "react";

/* Components */
import Modal from "../ModalGifos/ModalGifs";

/* Styles */
import "./chat.css";

const Chat = (props) => {
  const [show, setShow] = useState(false);
  const [gifs, setGifs] = useState([]);

  const getGifs = (e) => {
    props.setMessage("");
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=7wNkqg36lkAGX1ZqzH5vZUc1UZJ3zHEb&limit=12&rating=g"
    ).then((response) => {
      console.log(response);
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
          placeholder="Enter your message here!"
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
          <button
            onClick={() => {
              getGifs();
            }}
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Gifos
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
