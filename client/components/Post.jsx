import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePost } from '../slices/contentContainerSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  console.log("post", post); 

  const handleClick = () => {
    dispatch(setActivePost(post));
  };

  console.log(typeof post.createdAt)
  let datePortion = (post.createdAt ? post.createdAt.substring(0,10) : "old datestamp will be updated")
  datePortion = new Date(datePortion)
  datePortion = datePortion.toDateString();
  

  let timePortion = (post.createdAt ? post.createdAt.substring(11,16) : "old datestamp will be updated")
  console.log('time', timePortion)

   
    

  return (
    <div className='post' onClick={handleClick}>
      <a>Time posted: {datePortion} at {timePortion}</a>
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
