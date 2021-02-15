import React from "react";
import { Link } from "react-router-dom";

import "./SignIn.css";
import avatar from "../../assets/images/avatar.svg";

const SingIn = () => {
  return (
    <div className="container signIn__container">
      <div className="row">
        <div className="signIn__wrapper">
          <form action="index.html" className="mb-3 signIn__form">
            <div className="signIn__img">
              <img src={avatar} alt="avatar" />
              <h2>Welcome</h2>
            </div>
            <div className="mb-3">
              <label for="nickname" className="form-label">
                NickName
              </label>
              <input type="email" className="form-control" id="nickname" />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="signIn__Container-btn">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
              <Link to="/SignUp">
                <button className="btn SingIn__btn-redirection">Sign Up</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
