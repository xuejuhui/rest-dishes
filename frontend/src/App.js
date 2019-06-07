import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { connect } from "react-redux";
import Authenticated from "./components/Authenticated";
import { SnackbarProvider } from "notistack";
import AlertMessage from "./components/AlertMessage/AlertMessage";
import CartContainer from "./components/Cart/CartContainer";
import DashBoardContainer from "./components/DashBoard/DashBoardContainer";
import {
  LandingPage,
  DishContainer,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  UserProfileContainer
} from "./Lazy/LazyLoad";

class App extends Component {
  render() {
    return (
      <SnackbarProvider maxSnack={3}>
        <Router>
          <div className="App">
            <AlertMessage />
            <NavBar />
            <Route exact path="/" component={LandingPage} />
            <Authenticated path="/register" component={Register} />
            <Authenticated path="/login" component={Login} />
            <Route exact path="/reset/:token" component={ResetPassword} />
            <Authenticated component={ForgotPassword} path="/forgot" />
            <ProtectedRoute component={DishContainer} path="/secret" />
            <ProtectedRoute component={CartContainer} path="/cart" />
            <ProtectedRoute component={DashBoardContainer} path="/dashboard" />
            <ProtectedRoute
              component={UserProfileContainer}
              path="/user-profile/:id"
            />
          </div>
        </Router>
      </SnackbarProvider>
    );
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(App);
