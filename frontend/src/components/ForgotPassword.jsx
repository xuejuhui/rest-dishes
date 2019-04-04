import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
class ForgotPassword extends React.Component {
  state = {
    email:null,
  }
  handlePasswordChange = (e) =>{
    this.setState({email:e.target.value});
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const { email } = this.state
    axios.post(`http://localhost:5000/api/users/forgotpassword`,{ email }).then((user)=>{
      if(user){
        console.log(user)
      }
    })
  }
  render(){
    return(
      <div>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handlePasswordChange} />
      </FormControl>
      <button onClick={this.handleSubmit}>TAP</button>
      </div>
    )
  }
}

export default ForgotPassword
