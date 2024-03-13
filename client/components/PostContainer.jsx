import React, { useEffect } from 'react';
import Post from './Post.jsx';
import { refresh } from '../slices/postContainerSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const PostContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postContainer.posts);

  const getPosts = () => {
    fetch('http://localhost:3000/display_all_posts', {credentials: 'include'})
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(refresh(json));
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
    <button className="refreshButton" onClick={getPosts}>Refresh</button>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </section>
  );
};

export default PostContainer;
