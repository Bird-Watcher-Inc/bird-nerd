import React from 'react';
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
import { refresh } from '../slices/postContainerSlice';

const CreateNewPost = () => {
  const dispatch = useDispatch();
  const createNewPostState = useSelector((state) => state.createNewPost);

  //also defined in PostContainer but couldn't figure out how to import it properly because it is dependent on dispatch
  const getPosts = () => {
    fetch('http://localhost:3000/display_all_posts')
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(refresh(json));
      });
  };

  const handleClientInput = (actionCreator, value) => {
    dispatch(actionCreator(value));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
      fetch('http://localhost:3000/newpost', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createNewPostState),
      })
        .then((result) => result.json())
        .then((res) => {
          console.log(res);
          getPosts();
          dispatch(reset());
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log('Error creating post: ', error);
    }
  };

  return (
    <div className='postFormWrap'>
    <p>Add a New Post</p>
    <form onSubmit={handleSubmit} className="createPostForm">
      <div className='title'>
        <input
          className='title-box'
          type='text'
          placeholder='Title of your Post'
          value={createNewPostState.title}
          onChange={(e) => handleClientInput(updateTitle, e.target.value)}
        />
      </div>
      <div className='species'>
        <input
          className='species-box'
          type='text'
          placeholder='Bird Species'
          value={createNewPostState.birdName}
          onChange={(e) => handleClientInput(updateNameOfBird, e.target.value)}
        />
      </div>
      <div className='location'>
        <input
          className='location-box'
          type='text'
          placeholder='Where did you see this bird?'
          value={createNewPostState.location}
          onChange={(e) => handleClientInput(updateLocation, e.target.value)}
        />
      </div>
      <div className='weather'>
        <input
          className='weather-box'
          type='text'
          placeholder='What was the weather like?'
          value={createNewPostState.weatherConditions}
          onChange={(e) => handleClientInput(updateWeather, e.target.value)}
        />
      </div>
      <div className='date'>
        <input
          className='date-box'
          type='text'
          placeholder='Date you saw the bird'
          value={createNewPostState.date}
          onChange={(e) => handleClientInput(updateDate, e.target.value)}
        />
      </div>
      <div className='time'>
        <input
          className='time-box'
          type='text'
          placeholder='Time you saw the bird'
          value={createNewPostState.time}
          onChange={(e) => handleClientInput(updateTime, e.target.value)}
        />
      </div>
      <div className='textarea'>
        <input
          className='textarea-box'
          placeholder='Include details about your sighting'
          value={createNewPostState.postContent}
          onChange={(e) => handleClientInput(updateBody, e.target.value)}
        />
      </div>
      <button type='submit' id="createPostButton">Create Post</button>
    </form>
    </div>
  );
};

export default CreateNewPost;
