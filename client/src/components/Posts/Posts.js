
import React from 'react';
import {  Card, CardContent, CardMedia, Typography ,Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import sky from '../../images/sky.jpg';

const Posts = ({ setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const posts = useSelector((state) => state.posts.filter(post => ((user === null ? undefined : (user.result === null ? undefined : user.result.googleId)) === (post === null ? undefined :post.creator)|| (user === null ? undefined : (user.result === null ? undefined : user.result._id)) === (post === null ? undefined :post.creator))));
  const classes = useStyles();

  if(!(user === null ? undefined : (user.result === null ? undefined : user.result.name))){
    return (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} item xs={12} sm={6} md={6}>
      <Card className={classes.card}>
      <CardMedia className={classes.media} image={sky} title="Hi" />
      <div className={classes.overlay}>
        <Typography variant="h6" component="h2">This where you can have your own dream diary </Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">#DreamDiary</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Sign Up to journal your dreams.</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p"> Password is 123123 for the test accounts. </Typography>
      </CardContent>
    </Card>
    </Grid>
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