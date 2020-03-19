import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import TooltipButton from "../utils/TooltipButton";
// REDUX
import { connect } from "react-redux";
import { logout, uploadImage } from "../redux/actions";

// MUI stuff
import Button from "@material-ui/core/Button";
import { Paper, Typography } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.spreadThis
});

class Profile extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    // send to server
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const {
      classes,
      user: {
        credentials: {
          handle,
          medicalRecord,
          createdAt,
          imageUrl,
          bio,
          location
        },
        loading,
        authanticated
      }
    } = this.props;
    let profileMarkup = !loading ? (
      authanticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img className="profile-image" src={imageUrl} alt="profile" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <TooltipButton
                tip={"ערוך תמונת פרופיל"}
                onClick={this.handleEditPicture}
                btnClassName={"button"}
              >
                <EditIcon color="primary" />
              </TooltipButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`/users/${handle}`}>
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {medicalRecord && (
                <Typography variant="body2">{medicalRecord}</Typography>
              )}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>הצטרף ב {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <EditDetails />
              <TooltipButton
                tip={"התנתקות"}
                onClick={this.handleLogout}
                btnClassName={"button margin-top"}
              >
                <KeyboardReturn color="primary" />
              </TooltipButton>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            לא קיים פרופיל...
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              התחבר
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/register"
            >
              הרשם
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading ... </p>
    );
    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapActionsToProps = { logout, uploadImage };

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
