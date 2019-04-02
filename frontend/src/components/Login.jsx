import React, { Component } from "react";
import { register, login, logout } from "../actions/authActions";
import { connect } from "react-redux";
class Login extends Component {
  render() {
    const { login } = this.props
    return <div><button onClick={()=>login({name:"ray",email:"ray@ray.com",password:"123"})}>Login</button></div>;
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.auth.user,
    error: state.error.message
  };
};
const mapDispatchToProps = {
  register,
  login,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
