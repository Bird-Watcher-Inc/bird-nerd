import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePost } from '../slices/contentContainerSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  console.log("post", post); 

  const handleClick = () => {
    dispatch(setActivePost(post));
  };
  return (
    <div className='post' onClick={handleClick}>
      <p>User: {post.username}</p>
      <p>Bird Name: {post.birdName}</p>
      <p>Post: {post.postContent}</p>
      <p>Location: {post.location}</p>
      <p>Weather: {post.weatherConditions}</p>
      <p>Location: {post.location}</p>
      <p>Date & Time: {post.date} at {post.time}</p>

    </div>
  );
};

export default Post;
