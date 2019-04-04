import React from 'react';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class ResetPassword extends React.Component {
  state = {
    password:null,
    validToken:null,
  }
  componentDidMount (){
    const { token } = this.props.match.params
    axios.get(`http://localhost:5000/api/users/reset/${token}`).then((user)=>{
      if(user){
        this.setState({validToken:true})
      }
    })
    .catch(e=>{
        this.setState({validToken:false})
    }
    )
  }
  handlePasswordChange = (e) =>{
    this.setState({password:e.target.value});
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const password = this.state
    const { token } = this.props.match.params
    axios.put(`http://localhost:5000/api/users/reset/${token}`,password).then((user)=>{
      if(user){
        console.log(user)
      }
    })
  }
  render(){
    const { validToken } = this.state
    console.log(validToken)
    if(validToken===false){
      return <Redirect to='/secret'/>
    }
    console.log(this.state)
    return(
      <div>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">New Password</InputLabel>
          <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handlePasswordChange} />
        </FormControl>
        <button onClick={this.handleSubmit}>TAP</button>
      </div>
    )
  }
}

export default ResetPassword
