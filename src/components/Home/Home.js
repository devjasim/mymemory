import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={12} md={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
