import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";


// assets
import appIcon from "../assets/Images/DoctorLogo.png";

// MUI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { login, clearErrors } from "../redux/actions";

const styles = theme => ({
  ...theme.spreadThis
});

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentWillUnmount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleSubmit = e => {
    const { userLogin } = this.props;
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    userLogin(userData);
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes, errors, loading } = this.props;

    return (
      <Grid container className={classes.formContainer} dir="rtl">
        <Grid item sm />
        <Grid item sm>
          <img src={appIcon} alt="icon" className={classes.image} />

          <form noValidate onSubmit={this.handleSubmit} dir="rtl">
            <TextField
              dir="rtl"
              id="email"
              name="email"
              type="email"
              label='דוא"ל'
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="סיסמא"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
              style={{ color: loading ? "transparent" : "" }}
            >
              כניסה
              {loading && (
                <CircularProgress size={18} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
          </form>
          <Link
            to={"/register"}
            style={{ marginTop: "20px", cursor: "pointer" }}
          >
            לא קיים חשבון? הרשם
          </Link>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ ui }) => {
  return {
    errors: ui.errors,
    loading: ui.loading
  };
};

const mapDispatchToProps = dispatch => ({
  userLogin: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
