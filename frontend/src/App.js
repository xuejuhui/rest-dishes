import React, { Component } from "react";
import "./App.css";

import { Provider } from 'react-redux';
import store from "./store"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing"
import Register from "./components/Register"
import Login from "./components/Login"
import NavBar from "./components/NavBar"

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
          </div>
        </Router>
        </Provider>
    );
  }
}

export default App;
