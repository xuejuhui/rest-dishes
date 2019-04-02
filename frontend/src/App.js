import React, { Component } from "react";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/requiresAuth";
import Secret from "./components/Secret";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute component={Secret} path="/secret" />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
