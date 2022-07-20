import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Form, Segment, Grid, GridColumn,
} from 'semantic-ui-react';
import Snowflake from '../SnowFlake.gif';

// if (!email || !password) {
//   alert("Fill in the form!");
//   return;
// }

const LoginForm = (props) => {
  const {
    step, setStep, login, setLogin,
  } = props;

  // initialize useState for login input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (event) => {
    // change this to 3 later on for favourite page
    setStep(3);

    if ((username, password)) {
      console.log('username ', username, 'password: ', [password]);

      const loginObj = {
        username,
        password,
      };

      console.log('This is login object: ', loginObj);
      // check with backend
      const verifyLogin = await axios.post('user/login', loginObj);
      console.log('verify token:', verifyLogin);
      localStorage.setItem('token', verifyLogin.data.token);

      setLogin(loginObj);

      // input fields are reset
      setUsername('');
      setPassword('');
      event.preventDefault();
    } else {
      alert('Username/Password entered incorrectly');
    }
  };

  // get login input values
  const usernameInput = (event) => {
    setUsername(event.target.value);
  };

  const passwordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpSubmit = () => {
    setStep(2);
  };

  return (
    <>
      <div className="ui container main-container">
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed stackable padded grid">
            <div className="column">
              <div
                className="ui form"
                style={{ marginTop: '130px', width: '100%' }}
              >
                <div className="field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={usernameInput}
                    />
                    <i className="user icon"></i>
                  </div>
                </div>
                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input
                      type="Password"
                      placeholder="Password"
                      onChange={passwordInput}
                    />
                    <i className="lock icon"></i>
                  </div>
                </div>
                <div
                  className="ui teal big submit button front-page-button"
                  onClick={handleLoginSubmit}
                >
                  <i className="sign-in icon"></i>
                  Login
                </div>
              </div>
            </div>
            <div className="middle aligned column">
              <div className="to-signup-div">
                <img
                  className="weather-logo"
                  src={Snowflake}
                  alt="weather-gif"
                />
              </div>
              <div className="ui teal big button" onClick={handleSignUpSubmit}>
                <i className="signup icon"></i>
                Sign Up
              </div>
            </div>
          </div>
        </div>

        <div className="ui three steps">
          <div className="step">
            <i className="sign-in icon"></i>
            <div className="content">
              <div className="title">Login</div>
            </div>
          </div>
          <div className="active step">
            <i className="star icon"></i>
            <div className="content">
              <div className="title">'Favourite' Your Location</div>
            </div>
          </div>
          <div className="active step">
            <i className="comment alternate icon"></i>
            <div className="content">
              <div className="title">Start Chatting</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
