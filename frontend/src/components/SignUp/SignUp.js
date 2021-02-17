import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const url = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nickName ||
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword
    ) {
      setAlert("Please fill all fields");
    } else if (password === confirmPassword) {
      fetch("http://localhost:4000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: nickName,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }),
      }).then((response) => {
        if (response.status === 200) {
          url.push("/");
        } else if (response.status === 400) {
          console.log(response.headers);
          setAlert("The nickName already exists");
        } else if (response.status === 406) {
          console.log(response.headers);
          setAlert("The email already exists");
        } else {
          setAlert("Sorry, the server has presented an error. Try again later");
        }
      });
    } else {
      setAlert("The password is not coincidence");
    }
  };

  return (
    <div className="mt-3">
      <div className="signUp__alert">
        {alert ? (
          <div
            className="  alert alert-warning alert-dismissible fade show"
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
      <div className="container signUp__container">
        <div className="row">
          <div className="signUp__wrapper">
            <form onSubmit={(e) => handleSubmit(e)} className="signUp__form">
              <div className="signUp__title">
                <h2 className="title">New User</h2>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-at"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="NickName"
                  aria-label="NickName"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setNickName(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  aria-label="First Name"
                  aria-describedby="basic-addon3"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  aria-label="Last Name"
                  aria-describedby="basic-addon3"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div className="signUp__Container-btn">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <Link to="/">
                  <button className="btn SingUp__btn-redirection">
                    Sign In
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

export default SignUp;
