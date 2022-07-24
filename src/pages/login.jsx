import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Transparent from '../transparentBackground.gif';

const LoginForm = (props) => {
  const { setStep } = props;

  // login information
  const [login, setLogin] = useState('');

  // initialize useState for login input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // get login input values
  const usernameInput = (event) => {
    setUsername(event.target.value);
  };
  const passwordInput = (event) => {
    setPassword(event.target.value);
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };

  const handleLoginSubmit = async (event) => {
    if ((username, password)) {
      const loginObj = {
        username,
        password,
      };

      // check with backend
      const verifyLogin = await axios.post('/user/login', loginObj);

      if (!verifyLogin.data.token) {
        localStorage.setItem('token', 'NOT SET');
        swal('Wrong username/password, try again!');
        setStep(1);
      } else {
        localStorage.setItem('token', verifyLogin.data.token);

        // change this to 3 later on for favourite page
        setStep(3);
        setLogin(loginObj);

        swal('Welcome!', 'Login successful');
      }

      // input fields are reset
      clearInputs();

      event.preventDefault();
    } else {
      console.log('Not filled');
      swal('Inputs not filled');
    }
  };

  const handleSignUpSubmit = () => {
    setStep(2);
    clearInputs();
  };

  return (
    <>
      <div className="main-container">
        <div className="ui stackable grid">
          <div className="two column row">
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
                  style={{ display: "block", width: "fit-content", margin: "auto"}}
                  onClick={handleLoginSubmit}
                >
                  <i className="sign-in icon"></i>
                  Login
                </div>
              </div>
            </div>
            <div className="column">
              <div className="to-signup-div">
                <img
                  className="weather-logo"
                  src={Transparent}
                  alt="weather-gif"
                />
              </div>
              <div className="ui teal big button" style={{ display: "block", width: "fit-content", margin: "auto"}} onClick={handleSignUpSubmit}>
                <i className="signup icon"></i>
                Sign Up
              </div>
            </div>
          </div>
          <div className="row steps-container">
            <div className="column">
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
                    <div className="title">Find A City</div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
