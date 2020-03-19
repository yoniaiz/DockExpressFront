import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import TooltipButton from "../utils/TooltipButton";

// redux
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions";

// MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = theme => ({
  ...theme.spreadThis,
  deleteButton:{
    position:'absolute',
    left:'5px',
    top:'5px',
  }
});

class DeleteScream extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <TooltipButton
          tip="מחיקת פוסט"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </TooltipButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>בטוח למחוק את הפוסט?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              ביטול
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              מחוק
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
