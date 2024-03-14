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
  // console.log("post", post); 

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
      <a><strong></strong> {datePortion} at {timePortion}</a>
      <span className='username'><strong>{post.username}</strong></span>
      <p><strong>Bird Name: </strong> {post.birdName}</p>
      <p><strong>Weather: </strong>{post.weatherConditions}</p>
      <p><strong>Location: </strong> {post.location}</p>
      <p><strong>Time of bird sighting:</strong> {post.date} at {post.time}</p>
      <p><strong>Details: </strong> </p>
      <p className='postdetails'>{post.postContent}</p>
      <button onClick={()=>setDisplayModal(true)}>Edit</button>
      {displayModal && <Modal
        username={post.username}
        postContent={post.postContent}
        postId = {post._id}
        handleCancel= {handleCancel}
      ></Modal>}
    </div>
  );
};

export default Post;
