import React from 'react';
import { useSelector } from 'react-redux';

const ContentContainer = () => {
  const activePostState = useSelector(
    (state) => state.contentContainer.activePost
  );

  if (!activePostState) {
    return <div>Click any post to see full content</div>;
  }

  return (
    <div>
      <h1>{activePost.title}</h1>
      <p>{activePost.postContent}</p>
      <p>{activePost.birdName}</p>
      <p>{activePost.location}</p>
      <p>{activePost.weatherConditions}</p>
      <p>{activePost.date}</p>
      <p>{activePost.time}</p>
    </div>
  );
};

export default ContentContainer;
