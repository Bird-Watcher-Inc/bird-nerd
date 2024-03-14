/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CreateNewPost from '../client/components/CreateNewPost.jsx';
import { useSelector, useDispatch } from 'react-redux';
import store from '../client/store.js';
import { reset } from '../client/slices/createNewPostSlice.js';

describe('CreateNewPost', () => {
  const initialState = {
    createNewPost: {
      title: '',
      postContent: '',
      birdName: '',
      location: '',
      weatherConditions: '',
      date: '',
      time: '',
    },
  };
  const mockStore = configureStore([]);

  test('renders to the screen with initial state', () => {
    let store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <CreateNewPost />
      </Provider>
    );

    // Check if the elements are rendered with their initial values
    expect(getByTestId('title-box')).toHaveValue('');
    expect(getByTestId('textarea-box')).toHaveValue('');
    expect(getByTestId('species-box')).toHaveValue('');
    expect(getByTestId('location-box')).toHaveValue('');
    expect(getByTestId('weather-box')).toHaveValue('');
    expect(getByTestId('date-box')).toHaveValue('');
    expect(getByTestId('time-box')).toHaveValue('');
  });

  test('clears all fields after create post button is created', async () => {
    const testState = {
    createNewPost: {
      title: 'Test Post',
      postContent: 'test content',
      birdName: 'test bird',
      location: 'test location',
      weatherConditions: 'test weather',
      date: 'test date',
      time: 'test time',
    },
  };

    let store = mockStore(testState);
    const { getByTestId } = render(
      <Provider store={store}>
        <CreateNewPost />
      </Provider>
    );
    
    const form = getByTestId('createPostForm');

    await fireEvent.submit(form);
    await store.dispatch({type: "createNewPost/reset"})

    expect(await getByTestId('title-box')).toHaveValue('');
    expect(getByTestId('textarea-box')).toHaveValue('');
    expect(getByTestId('species-box')).toHaveValue('');
    expect(getByTestId('location-box')).toHaveValue('');
    expect(getByTestId('weather-box')).toHaveValue('');
    expect(getByTestId('date-box')).toHaveValue('');
    expect(getByTestId('time-box')).toHaveValue('');
  })
});
