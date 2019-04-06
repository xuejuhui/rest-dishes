import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import { forgotPassword } from "../actions/authActions";
import Loading from "./Loading";
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

class ForgotPassword extends React.Component {
  state = {
    email: null,
    submitted: false
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false
  // }
  handleChange = e => {
    this.setState({ [e.traget.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    this.props.forgotPassword(email);
  };
  render() {
    const { isLoading, classes } = this.props;
    return (
      <div>
        {isLoading ? (
          <Loading type="spin" color="black" />
        ) : (
          <div className={classes.main}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <button onClick={this.handleSubmit}>TAP</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.loading
  };
};
// const mapDispatchToProps = {
//   autoLogin
// };

export default connect(
  mapStateToProps,
  { forgotPassword }
)(withStyles(styles)(ForgotPassword));
