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
  // const currentUser = useSelector((state) => state.app.currentUser);

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
  }
  const handleClientInput = (actionCreator, value) => {
    dispatch(actionCreator(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newpost', {
        method: 'POST',
        headers: {
          'Content Type': 'application/json',
        },
        body: JSON.stringify(createNewPostState),
      });
      if (!response.ok) {
        throw new Error('Failed to create new post');
      }
      alert('Created post successfully');
      dispatch(reset());
    } catch (error) {
      console.log('Error creating post: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='textarea'>
        <textarea
          className='textarea-box'
          value={createNewPostState.postContent}
          onChange={(e) => handleClientInput(updateBody, e.target.value)}
        />
      </div>
      <div className='title'>
        <input
          className='title-box'
          type='text'
          placeholder='title'
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
          value={createNewPostState.weather}
          onChange={(e) => handleClientInput(updateWeather, e.target.value)}
        />
      </div>
      <div className='date'>
        <input
          className='date-box'
          type='text'
          placeholder='Date'
          value={createNewPostState.date}
          onChange={(e) => handleClientInput(updateDate, e.target.value)}
        />
      </div>
      <div className='time'>
        <input
          className='time-box'
          type='text'
          placeholder='Time'
          value={createNewPostState.time}
          onChange={(e) => handleClientInput(updateTime, e.target.value)}
        />
      </div>
      <button
        type='submit'
        onClick={(e) => {
          const postContent = document.querySelector('.textarea-box').value;
          const birdName = document.querySelector('.species-box').value;
          const location = document.querySelector('.location-box').value;
          const weatherConditions = document.querySelector('.weather-box').value;
          const date = document.querySelector('.date-box').value;
          const time = document.querySelector('.time-box').value;

          const body = {
            postContent,
            birdName,
            location,
            weatherConditions,
            date,
            time,
          }
          fetch('http://localhost:3000/newpost', {
            method:'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          })
          .then((result) => result.json())
          .then((res) => {
            console.log(res)
          getPosts()})
          .catch(err => console.log(err))
        }}
      >
        Create Post{' '}
      </button>
    </form>
  );
};

export default CreateNewPost;
