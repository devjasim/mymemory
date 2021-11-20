import { CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();

  const posts = useSelector((post) => post.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6}>
          <Post setCurrentId={setCurrentId} post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
