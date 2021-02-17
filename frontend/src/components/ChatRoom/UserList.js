import React from "react";

/* Styles */
import "./UserList.css";

const UserList = (props) => {
  return (
    <div className="userList__container">
      <h2>Users online</h2>
      <ul className="userList__wrapper">
        {props.UserList.map((users) => {
          return (
            <li key={users.id}>
              <span className="icon-connected"></span>
              {users.nickName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
