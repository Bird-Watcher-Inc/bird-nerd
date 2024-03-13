import { createSlice } from '@reduxjs/toolkit';

const createNewPostSlice = createSlice({
  name: 'createNewPost',

  initialState: {
    title: '',
    postContent: '',
    birdName: '',
    location: '',
    weatherConditions: '',
    date: '',
    time: '',
  },

  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateBody: (state, action) => {
      state.postContent = action.payload;
    },
    updateNameOfBird: (state, action) => {
      state.birdName = action.payload;
    },
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
    updateWeather: (state, action) => {
      state.weatherConditions = action.payload;
    },
    updateDate: (state, action) => {
      state.date = action.payload;
    },
    updateTime: (state, action) => {
      state.time = action.payload;
    },
    reset: (state, action) => {
      state.title = '';
      state.postContent = '';
      state.birdName = '';
      state.location = '';
      state.weatherConditions = '';
      state.date = '';
      state.time = '';
    },
  },
});

export const {
  updateBody,
  updateNameOfBird,
  updateLocation,
  updateWeather,
  updateDate,
  updateTime,
  updateTitle,
  reset,
} = createNewPostSlice.actions;

export default createNewPostSlice.reducer;
