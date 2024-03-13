import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBody,
  updateNameOfBird,
  updateLocation,
  updateWeather,
  updateDate,
  updateTime,
  updateTitle,
  reset,
} from '../slices/createNewPostSlice';

const Modal = ( {handleCancel, postContent, username, postId} ) => {
 
  const [thisPostContent, setThisPostContent] = useState(postContent)
  
  // const handleInput = (setterfunc, input) => {
  //   console.log(thisPostContent)
  //   setterfunc(input);
  // }

  // const dispatch = useDispatch();
  // const createNewPostState = useSelector((state) => state.createNewPost);
  // const currentUser = useSelector((state) => state.app.currentUser);

  // const handleClientInput = (actionCreator, value) => {
  //   dispatch(actionCreator(value));
  // };

  const handleSubmit = async (e) => {
    const updatedPost = {
      _id: postId,
      newPostContent: thisPostContent
    }
    e.preventDefault();
    console.log("updatedpost data", updatedPost)
    try {
      const response = await fetch('http://localhost:3000/edit_post', {
        method: 'PATCH',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      console.log("response from edit", response)
      if (!response.ok) {
        throw new Error('Failed to edit post');
      }
      alert('Edited post successfully');
      dispatch(reset());
    } catch (error) {
      console.log('Error editing post: ', error);
    }
    handleCancel();
  };

    // const handleSubmit = () => {
    //   console.log(thisPostContent)
    //   setModalOpen(false);
    // }

  return(
    <div className="modalContainer">
      <form onSubmit={handleSubmit}>
      <div className="editModal">
        <h2>{username}</h2>
        {/* <label for="editDate">Observation Date</label>
        <input id="editDate" defaultValue={date}></input>
        <label for="editTime">Observation Time</label>
        <input id="editTime" defaultValue={time}></input>
        <label for="editLocation">Location</label>
        <input id="editLocation" deafaultValue={location}></input>
        <label for="editWeather">Weather</label>
        <input id="editWeather" defaultValue={weather}></input> */}
        <label htmlFor="editpostContent">Original Post:</label>
        <input id="editpostContent"  defaultValue={thisPostContent} onChange={(e)=>setThisPostContent(e.target.value)}></input>
        <button onClick={()=>handleCancel()}> cancel </button>
        <button onClick={(e)=>handleSubmit(e)}> update </button>
      </div>
      </form>
    </div>
  )
}

export default Modal;