import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import DeleteScream from "./DeleteScream";
// REDUX
import { likeScream, unlikeScream } from "../redux/actions";
import { connect } from "react-redux";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Day js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TooltipButton from "../utils/TooltipButton";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "absolute"
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    )
      return true;

    return false;
  };

  likeScream = () => {
    this.props.like(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlike(this.props.scream.screamId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        userImage,
        createdAt,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authanticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authanticated ? (
      <TooltipButton tip={"לייק"}>
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </TooltipButton>
    ) : this.likedScream() ? (
      <TooltipButton tip={"הורד לייק"} onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </TooltipButton>
    ) : (
      <TooltipButton tip={"לייק"} onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </TooltipButton>
    );

    const deleteButton =
      authanticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card} dir="rtl">
        <CardMedia
          className={classes.image}
          image={userImage}
          title="profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
          {likeButton}
          <span>{likeCount} לייקים</span>
          <TooltipButton tip={"תגובות"}>
            <ChatIcon color="primary"></ChatIcon>
          </TooltipButton>
          <span>{commentCount} תגובות</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = dispatch => ({
  like: screamId => dispatch(likeScream(screamId)),
  unlike: screamId => dispatch(unlikeScream(screamId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
