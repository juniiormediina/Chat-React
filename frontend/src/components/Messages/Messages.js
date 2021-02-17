import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

/* Components */
import Message from "../Message/Message";

/* Styles */
import "./Messages.css";

const Messages = ({ messages, record }) => {
  return (
    <ScrollToBottom className="messages__container">
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
    </ScrollToBottom>
  );
};
export default Messages;
