import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from "react-redux";
import { forgotpassword } from "../actions/authActions";
import Loading from './Loading'

class ForgotPassword extends React.Component {
  state = {
    email:null,
    submitted:false,
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false
  // }
  handlePasswordChange = (e) =>{
    this.setState({email:e.target.value});
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const { email } = this.state
    this.props.forgotpassword(email)
  }
  render(){
    const { isLoading } = this.props
    return(
      <div>
{ isLoading? 
  <Loading type="spin" color="black"/>
      :
      <Fragment>
      <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handlePasswordChange} />
            </FormControl>
            <button onClick={this.handleSubmit}>TAP</button>
      </Fragment>
    }
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    isLoading:state.auth.loading
  }
}
// const mapDispatchToProps = {
//   autoLogin
// };

export default connect(
  mapStateToProps,
  { forgotpassword }
)(ForgotPassword);
