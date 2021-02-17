import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./SignIn.css";
import avatar from "../../assets/images/avatar.svg";

const SingIn = () => {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const url = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickName || !password) {
      setAlert("Please fill all fields");
    } else {
      fetch("http://localhost:4000/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickName: nickName, password: password }),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((information) => {
            window.sessionStorage.setItem("token", information.token);
            url.push("/chatroom");
          });
        }
        if (response.status === 401) {
          setAlert("Invalid password o user");
        } else {
          setAlert("Sorry, the server has presented an error. Try again later");
        }
      });
    }
  };
  return (
    <div className="mt-3">
      <div className="signUp__alert">
        {alert ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {alert}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ) : null}
      </div>
      <div className="container signIn__container">
        <div className="row">
          <div className="signIn__wrapper">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="mb-3 signIn__form"
            >
              <div className="signIn__img">
                <img src={avatar} alt="avatar" />
                <h2>Welcome</h2>
              </div>
              <div className="mb-3">
                <label htmlFor="nickName" className="form-label">
                  NickName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nickName"
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="signIn__Container-btn">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
                <Link to="/SignUp">
                  <button className="btn SingIn__btn-redirection">
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
