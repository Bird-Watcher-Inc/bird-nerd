import React, { useEffect, useState } from 'react';
import Post from './Post.jsx';
import { refresh } from '../slices/postContainerSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const PostContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postContainer.posts);
  const [usernameFilter, setUsernameFilter] = useState('');

  const getPosts = () => {
    fetch('http://localhost:3000/display_all_posts', {credentials: 'include'})
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(refresh(json));
        setUsernameFilter('');
      });
  };

  const handleFilterChange = (e) => {
    setUsernameFilter(e.target.value);
  };

  const filterPosts = () => {
    fetch(`http://localhost:3000/postsByUser?username=${usernameFilter}`)
      .then((results) => results.json())
      .then((filteredPosts) => {
        dispatch(refresh(filteredPosts));
      })
      .catch((error) => {
        console.error('Error fetching filtered posts:', error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="postContainer">
      <div className="postUtils">
        <div className="filterUtils">
          <input type="text" value={usernameFilter} onChange={handleFilterChange} placeholder="Filter by username" />
          <button onClick={filterPosts}>Filter</button>
        </div>
        <button className="refreshButton" onClick={getPosts}>Refresh</button>
      </div>
      {posts.map((post) => (
        <Post key={post._id} post={post}/>
      ))}
    </div>
  );
};

export default PostContainer;
