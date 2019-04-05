import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Authenticated = ({component: Component, ...rest})=>{
  return(
    <Route {...rest}
    render={props=>
      rest.user.login ? (
        <Redirect
          to={{ pathname: "/secret", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
    />
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    error: state.error.message
  };
};
export default connect(
  mapStateToProps,
  null
)(Authenticated);
