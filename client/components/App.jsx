import React from 'react';
import CreateNewPost from './CreateNewPost.jsx';
// TODO: import components that the frontend team creates
import { useSelector } from 'react-redux';
import MainContainer from './MainContainer.jsx';
import Form from './Form.jsx';
import style from '../styles/style.css';

const App = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  // return either the signin or main feed depending on whethere the user is logged in or not
  // return isLoggedIn ? <MainContainer /> : <Form />;
  return <MainContainer />;
};

export default App;
