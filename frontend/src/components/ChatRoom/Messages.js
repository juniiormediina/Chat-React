import React from "react";

/* Components */
import Message from "./Message";

/* Styles */
import "./Messages.css";

const Messages = ({ messages, record }) => {
  return (
    <div className="message__container">
      {record.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};
export default Messages;
