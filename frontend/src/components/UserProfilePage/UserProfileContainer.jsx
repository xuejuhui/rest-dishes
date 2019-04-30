import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class UserProfileContianer extends Component {
  componentDidMount() {
    console.log("hi");
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "jwt"
    )}`;
    console.log(axios.defaults);
    axios
      .get("http://localhost:5000/api/dishes/userdishes")
      .then(x => console.log(x.data))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Im the boss</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.auth.user
  };
};
export default connect(
  mapStateToProps,
  null
)(UserProfileContianer);
