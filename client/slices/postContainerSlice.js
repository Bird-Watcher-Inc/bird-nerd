import { createSlice } from '@reduxjs/toolkit';

export const postContainerSlice = createSlice({
  name: 'postContainer',
  initialState: {
    posts: [
      // --- example ---
      // {_id:0,textContent:'hello',user:'marselena'},
      // {_id:1,textContent:'bye',user:'lillian'}
    ],
    selected: null,
  },
  reducers: {
    // Refresh the list of all posts

    refresh: (state, action) => {
      const posts = action.payload;
      return { ...state, posts };
    },
    // Select a single post from the container
    select: (state, action) => {
      // get id from payload and store it in state as selected
      const selected = action.payload;
      return { ...state, selected };
    },
  },
});

export const { refresh, select } = postContainerSlice.actions;

export default postContainerSlice.reducer;
