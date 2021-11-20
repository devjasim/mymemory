import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === null) {
      await dispatch(createPost({ ...postData, name: user?.result?.name }));
    } else {
      await dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }

    await setCurrentId(null);

    await clear();
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your owl memories and like other's memories.{" "}
        </Typography>
      </Paper>
    );
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <form
          autoCapitalize="off"
          onSubmit={handleSubmit}
          className={`${classes.root} ${classes.form}`}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Memory{" "}
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({
                ...postData,
                title: e.target.value,
              })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({
                ...postData,
                message: e.target.value,
              })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({
                ...postData,
                tags: e.target.value.split(","),
              })
            }
          />

          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({
                  ...postData,
                  selectedFile: base64,
                })
              }
            />
          </div>

          <Button
            className={classes.buttonSubmit}
            sx={{ mb: "1rem" }}
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
