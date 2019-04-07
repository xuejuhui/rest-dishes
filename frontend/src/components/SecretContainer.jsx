import React, { Component } from "react";
import Secret from "./Secret";
import { connect } from "react-redux";
import { autoLogin } from "../actions/authActions";
import axios from "axios";
class SecretContainer extends Component {
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/dishes/userdish", {
        dishName: "Chicken",
        description: "This is very good chicken dish"
      })
      .then(res => console.log(res));
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
