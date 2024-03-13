import React, { useEffect } from 'react';
import Post from './Post.jsx';
import { refresh } from '../slices/postContainerSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const PostContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postContainer.posts);

  useEffect(() => {
    fetch('http://localhost:3000/display_all_posts', {credentials: 'include'})
      .then((results) => {
        return results.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(refresh(json));
      });
  }, []);

  // const componentsArray = [];
  // posts.forEach((post, i) => {
  //   componentsArray.push(
  //     <Post
  //       key={post._id}
  //       user={post.user}
  //       textContent={post.textContent}
  //       datetime={post.datetime}
  //       // TODO: add more props as necessary
  //     />
  //   );
  // });

  //   const componentsArray = [];
  //   posts.forEach((post, i) => {
  //     componentsArray.push(
  //       <Post
  //         key={post._id}
  //         birdName={post.birdName}
  //         date={post.date}
  //         dateStamp={post.dateStamp}
  //         location={post.location}
  //         postContent={post.postContent}
  //         time={post.time}
  //         username={post.username}
  //         weatherConditions={post.weatherConditions}
  //       />
  //     );
  //   });

  // return <section>{componentsArray}</section>;
  return (
    <section>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </section>
  );
};

export default PostContainer;
