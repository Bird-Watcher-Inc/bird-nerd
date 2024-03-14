import { createSlice } from '@reduxjs/toolkit';

const contentContainerSlice = createSlice({
  name: 'contentContainer',

  initialState: {
    activePost: null,
  },
  reducers: {
    setActivePost: (state, action) => {
      state.activePost = action.payload;
    },
  },
});

export const { setActivePost } = contentContainerSlice.actions;

export default contentContainerSlice.reducer;
