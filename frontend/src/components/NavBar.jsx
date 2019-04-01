import React from "react";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/MenuIcon';
import { connect } from 'react-redux';
import { register, login }  from '../actions/authActions'
console.log(login)

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBar(props) {
  // props.register({name:"ray",email:"ray@ray.com",password:123})
  const { classes, register, login } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          {/*<MenuIcon />*/}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Button color="inherit" onClick={()=> register({name:"ray",email:"ray1@ray.com",password:"123"})}>Register</Button>
          <Button color="inherit" onClick={()=> login({name:"ray",email:"ray1@ray.com",password:"23"})}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = {
  register,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
