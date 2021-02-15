import React from "react";

import { Link } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="container signUp__container">
      <div className="row">
        <div className="signUp__wrapper">
          <form action="index.html" className="signUp__form">
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
              />
            </div>

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon2"
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
              />
            </div>

            <div className="signUp__Container-btn">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
              <Link to="/">
                <button className="btn SingUp__btn-redirection">Sign In</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
