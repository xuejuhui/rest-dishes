import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { connect } from "react-redux";
import { resetPassword } from "actions/authActions";
import { Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => {
  return {
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    }
  };
};

class ResetPassword extends React.Component {
  state = {
    password: null,
    validToken: null
  };
  // Todo fix this
  componentDidMount() {
    const { token } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/users/reset/${token}`)
      .then(user => {
        if (user) {
          this.setState({ validToken: true });
        }
      })
      .catch(e => {
        this.setState({ validToken: false });
      });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { resetPassword } = this.props;
    const { password } = this.state;
    const { token } = this.props.match.params;
    resetPassword(password, token);
  };
  render() {
    const { validToken } = this.state;
    const { classes } = this.props;
    if (validToken === false) {
      return <Redirect to="/forgot" />;
    }
    return (
      <div className={classes.main}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">New Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleChange}
          />
        </FormControl>
        <button onClick={this.handleSubmit}>TAP</button>
      </div>
    );
  }
}

export default connect(
  null,
  { resetPassword }
)(withStyles(styles)(ResetPassword));
