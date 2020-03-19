import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, protectedRoute, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      protectedRoute && auth ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

AuthRoute.protoTypes = {
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    auth: user.authanticated
  };
};

export default connect(mapStateToProps)(AuthRoute);
