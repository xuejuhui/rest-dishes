import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const ForgotPassword = (props) =>{
  console.log(props)
  return(
    <div>
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="email">Email Address</InputLabel>
      <Input id="email" name="email" autoComplete="email" autoFocus onChange={props.handleEmailChange} />
    </FormControl>
    <button onClick={props.handleSubmit}>TAP</button>
    </div>
  )
}

export default ForgotPassword
