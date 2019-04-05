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
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import Authenticated from "./components/Authenticated";
import { SnackbarProvider } from 'notistack';
import AlertMessage from './components/AlertMessage/AlertMessage'
class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {

    return (
      <SnackbarProvider maxSnack={3}>
          <Router>
            <div className="App">
              <AlertMessage />
              <NavBar />
              <Route exact path="/" component={Landing} />
              <Authenticated  path="/register" component={Register} />
              <Authenticated  path="/login" component={Login} />
              <Route exact path="/reset/:token" component={ResetPassword} />
              <Authenticated  component={ForgotPassword} path="/forgot" />
              <ProtectedRoute component={SecretContainer} path="/secret" />
            </div>
          </Router>
      </SnackbarProvider>

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
