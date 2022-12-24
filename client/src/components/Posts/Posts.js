
import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const posts = useSelector((state) => state.posts.filter(post => ((user === null ? undefined : (user.result === null ? undefined : user.result.googleId)) === (post === null ? undefined :post.creator)|| (user === null ? undefined : (user.result === null ? undefined : user.result._id)) === (post === null ? undefined :post.creator))));
  const classes = useStyles();

  if(!(user === null ? undefined : (user.result === null ? undefined : user.result.name))){
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align="center">
          Please sign in to see and edit your diary.
          password is 123123 for the test accounts. 
          TODO: Make this part prettier.
        </Typography>
      </Paper>
    );
  }
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;