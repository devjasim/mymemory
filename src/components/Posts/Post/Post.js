import {
  Button,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { Fragment } from "react";
import useStyles from "./styles";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deletePost, likePosts, getPosts } from "../../../actions/posts";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const deleteHandler = async (id) => {
    await dispatch(deletePost(id));
  };

  const likePostsHandler = async (id) => {
    await dispatch(likePosts(id));
    await dispatch(getPosts());
  };

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <Fragment>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""} `}
        </Fragment>
      ) : (
        <Fragment>
          <ThumbUpOffAltIcon />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;
      </Fragment>
    );
  };

  console.log("POST", post);
  console.log("USER", user);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        component="div"
      />

      <div className={classes.overlay}>
        <Typography variant="h6"> {post.name} </Typography>
        <Typography variant="body1">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {user?.result?.googleId === post.creator ||
      user?.result?._id === post.creator ? (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon />
          </Button>
        </div>
      ) : null}

      <div className={classes.details}>
        <Typography color="textSecondary" variant="body2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5">
        {post.title}
      </Typography>

      <CardContent>
        <Typography color="textSecondary" component="p" variant="body2">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => likePostsHandler(post._id)}
        >
          <Likes />
        </Button>
        {user?.result?.googleId === post.creator ||
        user?.result?._id === post.creator ? (
          <Button
            size="small"
            color="primary"
            onClick={() => deleteHandler(post._id)}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;
