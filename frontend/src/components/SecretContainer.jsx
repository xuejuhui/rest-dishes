import React, { Component } from "react";
import Secret from "./Secret";
import { connect } from "react-redux";
import { autoLogin } from "../actions/authActions";
import axios from "axios";
class SecretContainer extends Component {
  componentDidMount() {
    axios.post("http://localhost:5000/api/dishes/dish");
  }
  render() {
    return <Secret />;
  }
}

const mapDispatchToProps = {
  autoLogin
};

export default connect(
  null,
  mapDispatchToProps
)(SecretContainer);
