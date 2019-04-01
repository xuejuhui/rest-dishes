import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar"
import { Provider } from 'react-redux';
import store from "./store"

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <NavBar />
            <h1>hello world</h1>
          </div>
        </Provider>
    );
  }
}

export default App;
