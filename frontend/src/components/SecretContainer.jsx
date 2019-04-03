import React, { Component } from "react";
import Secret from "./Secret";
import { connect } from "react-redux";
import { autoLogin } from "../actions/authActions";
class SecretContainer extends Component {
  componentDidMount() {
    this.props.autoLogin();
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
