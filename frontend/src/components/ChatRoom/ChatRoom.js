import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import jwt from "jsonwebtoken";

/* Components */
import Chat from "./Chat";
import UserList from "./UserList";
import Messages from "./Messages";

/* Styles */
import "./ChatRoom.css";

import * as appActions from "../../actions/appActions";
let socket;

const ChatRoom = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [record, setRecord] = useState([]);

  let url = useHistory();
  const ENDPOINT = "http://localhost:4000";
  const token = window.sessionStorage.getItem("token");
  let user = jwt.decode(token);

  useEffect(() => {
    socket = io(ENDPOINT, {
      query: { token: token },
    });
    if (token) {
      socket.emit("join", { user: user });
      props.saveUser(user);
      socket.on("getHistory", (data) => {
        setRecord(data);
      });
    } else {
      url.push("/");
    }
    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("updateList", ({ users }) => {
      setUsers(users);
    });
  }, [users]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit(
        "sendMessage",
        { text: message, user: user, type: "text" },
        () => setMessage("")
      );
    }
  };
  const gifClick = (url, setShow) => {
    setShow(false);
    socket.emit("sendMessage", { text: url, user: user, type: "gif" }, () =>
      setMessage("")
    );
  };

  return (
    <div className="container chatRoom__container mt-5">
      <div className="row">
        <UserList UserList={users} />
      </div>
      <div className="ChatRoom__wrapper">
        <Messages messages={messages} record={record} />
        <Chat
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          gifClick={gifClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.appReducer;
};

export default connect(mapStateToProps, appActions)(ChatRoom);
