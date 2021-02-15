import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

/* components */
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
