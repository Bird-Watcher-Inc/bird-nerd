import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePost } from '../slices/contentContainerSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(setActivePost(post));
  };
  return (
    <div className='post'>
      <h2>{post.username}</h2>
      <p>{post.postContent}</p>
    </div>
  );
};

export default Post;
