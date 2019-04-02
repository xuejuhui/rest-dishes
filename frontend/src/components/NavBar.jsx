import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/MenuIcon';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, login, logout } from "../actions/authActions";


const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function NavBar(props) {
  // props.register({name:"ray",email:"ray@ray.com",password:123})
  const { classes,  logout } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {/*<MenuIcon />*/}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              News
            </Link>
          </Typography>

          <Button color="inherit">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Register
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
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
)(withStyles(styles)(NavBar));
