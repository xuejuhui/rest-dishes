import React, { Component } from "react";
import "./App.css";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import  persistStore  from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import SecretContainer from "./components/SecretContainer";



class App extends Component {
  render() {
    const { store , persistor } = persistStore;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className="App">
              <NavBar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute component={SecretContainer} path="/secret" />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}


export default App;
