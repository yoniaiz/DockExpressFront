import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

// REDUX
import { getScreams } from "../redux/actions";
import { connect } from "react-redux";

import Scream from "../Components/Scream";
import Profile from "../Components/Profile";

export class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams } = this.props;
    let recentScreamsMarkup = screams
      ? screams.map(scream => (
          <Fragment key={scream.screamId}>
            <Scream scream={scream} />
          </Fragment>
        ))
      : "לא קיים תוכן...";
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  screams: PropTypes.array.isRequired,
  scream: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getScreams: PropTypes.func.isRequired
};

const mapStateToProps = ({ data }) => {
  return {
    screams: Array.isArray(data.screams) ? data.screams : [],
    scream: data.scream,
    loading: data.loading
  };
};

const mapDispatchToProps = dispatch => ({
  getScreams: () => dispatch(getScreams())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
