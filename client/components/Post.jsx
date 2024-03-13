import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setActivePost } from '../slices/contentContainerSlice';
import Modal from './EditModal.jsx';

const Post = ({ post }) => {
  const [displayModal, setDisplayModal] = useState(false)

  const handleCancel = () => {
    setDisplayModal(false);
  }

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
      <button onClick={()=>setDisplayModal(true)}>Edit</button>
      {displayModal && <Modal
        handleCancel= {handleCancel}
      ></Modal>}
    </div>
  );
};

export default Post;
