import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import SecretContainer from "./components/SecretContainer";
import { connect } from "react-redux";
import { autoLogin } from "./actions/authActions";


class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {

    return (


          <Router>
            <div className="App">
              <NavBar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute component={SecretContainer} path="/secret" />
            </div>
          </Router>


    );
  }
}

const mapDispatchToProps = {
  autoLogin
};

export default connect(
  null,
  mapDispatchToProps
)(App);
