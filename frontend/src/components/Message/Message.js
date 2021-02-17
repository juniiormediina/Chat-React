import React from "react";
import { connect } from "react-redux";

/* Styles */
import "./Message.css";

const Message = ({ message: { text, user, date, type }, id }) => {
  let toDate = new Date(date).toLocaleString();

  if (id === user.id && type === "text") {
    return (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">
          {user.nickName}
          {toDate}
        </p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{text}</p>
        </div>
      </div>
    );
  } else if (id === user.id && type === "gif") {
    return (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">
          {user.nickName}
          {toDate}
        </p>
        <div className="messageBox backgroundBlue">
          <img src={text} alt="gif sended" />
        </div>
      </div>
    );
  } else if (id !== user.id && type === "gif") {
    return (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <img src={text} alt="gif sended" />
        </div>
        <p className="sentText pl-10 ">
          {user.nickName} {toDate}{" "}
        </p>
      </div>
    );
  } else {
    return (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10 ">
          {user.nickName} {toDate}{" "}
        </p>
      </div>
    );
  }
};

const mapStateToProps = (reducers) => {
  return reducers.appReducer;
};

export default connect(mapStateToProps)(Message);
