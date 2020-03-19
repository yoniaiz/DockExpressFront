import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TooltipButton from "../utils/TooltipButton";
import { history } from "../utils/history";
// REDUX
import { connect } from "react-redux";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// ICONS
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

// const
import { headerNav } from "../constants";

export class Navbar extends Component {
  render() {
    const { authanticated } = this.props;

    return (
      <AppBar position="fixed" dir="rtl">
        <Toolbar className="nav-container">
          <TooltipButton tip={"בית"} onClick={() => history.push("/")}>
            <HomeIcon />
          </TooltipButton>
          {authanticated && (
            <Fragment>
              <TooltipButton tip={"התראות"}>
                <NotificationsIcon />
              </TooltipButton>
              <TooltipButton tip={"צור פוסט"}>
                <AddIcon />
              </TooltipButton>
            </Fragment>
          )}
          {headerNav.map(item => {
            if (
              typeof item.authanticated === "boolean" &&
              item.authanticated !== authanticated
            ) {
              return null;
            }

            return (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.url}
              >
                {item.name}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authanticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    authanticated: user.authanticated
  };
};

export default connect(mapStateToProps)(Navbar);
