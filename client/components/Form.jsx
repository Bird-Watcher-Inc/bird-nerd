import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../slices/appSlice.js';
import style from '../styles/style.scss';

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const signUpForm = () => (
    <div className='sign-up'>
      <div className='sign-up-wrap'>
        <h2 className='sign-up-text'>Sign Up</h2>
      </div>
      <form className='sign-up-form'>
        <input
          className='sign-up-username'
          type='text'
          placeholder='Username'
          // required={true}
        />
        <input
          className='sign-up-password'
          type='password'
          placeholder='Password'
          // require={true}
        />
        <button
          className='sign-up-button'
          type='button'
          onClick={(e) => {
            const username = document.querySelector('.sign-up-username').value;
            const password = document.querySelector('.sign-up-password').value;
            fetch('http://localhost:3000/auth/signup', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: username, password: password }),
            })
              .then((results) => {
                return results.json();
              })
              .then((json) => {
                // I don't know why it returns an error sometimes as a 'successful' result, but this is a quick fix for now
                if (!Object.hasOwn(json, 'err')) {
                  dispatch(logIn());
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );

  const signInForm = () => (
    <div className='sign-in'>
      <div className='sign-in-wrap'>
        <h2 className='sign-in-text'>Sign In</h2>
      </div>
      <form className='sign-in-form'>
        <input
          className='sign-in-username'
          type='text'
          placeholder='Username'
          // required={true}
        />
        <input
          className='sign-in-password'
          type='password'
          placeholder='Password'
          // required={true}
        />
        <button
          className='sign-in-button'
          type='button'
          onClick={(e) => {
            const username = document.querySelector('.sign-in-username').value;
            const password = document.querySelector('.sign-in-password').value;
            fetch('http://localhost:3000/auth/signin', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: username, password: password }),
            })
              .then((results) => {
                return results.json();
              })
              .then((json) => {
                // I don't know why it returns an error sometimes as a 'successful' result, but this is a quick fix for now
                if (!Object.hasOwn(json, 'err')) {
                  dispatch(logIn());
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );

  const renderForm = () => {
    if (isSignUp) {
      return signUpForm();
    } else {
      return signInForm();
    }
  };

  const switchForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className='form-container'>
      {renderForm()}
      <button className='switch-button' onClick={switchForm}>
        {isSignUp
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Form;
