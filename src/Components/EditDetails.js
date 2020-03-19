import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TooltipButton from "../utils/TooltipButton";
// REDUX
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions";

// MUI stuff
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.spreadThis
});

class EditDetails extends Component {
  state = {
    bio: "",
    location: "",
    medicalRecord: "",
    open: false
  };

  componentDidMount = () => {
    const { credentials } = this.props;
    if (credentials) {
      this.mapUserDetailsToState(credentials);
    }
  };

  mapUserDetailsToState = credentials => {
    const { bio, medicalRecord, location } = credentials;
    this.setState({
      bio,
      medicalRecord,
      location
    });
  };

  handleOpen = () => {
    const { credentials } = this.props;
    if (credentials) {
      this.mapUserDetailsToState(credentials);
    }
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { bio, medicalRecord, location } = this.state;
    const userDetails = {
      bio,
      medicalRecord,
      location
    };
    this.props.editUserDetails(userDetails);

    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <TooltipButton
          tip={"ערוך נתונים"}
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </TooltipButton>

        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>עריכת נתונים</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="מידע כללי"
                rows="3"
                placeholder="ספר/י על עצמך"
                multiline
                value={this.state.bio}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                name="medicalRecord"
                type="text"
                label="מידע רפואי"
                rows="3"
                multiline
                placeholder="ספר/י על עברך הרפואי"
                value={this.state.medicalRecord}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                name="location"
                type="text"
                label="כתובת"
                placeholder="הכנס/י כתובת מלאה"
                value={this.state.location}
                fullWidth
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              ביטול
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => {
  return { credentials: user.credentials };
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
