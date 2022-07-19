import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Button, Form, Segment, Grid, GridColumn,
} from 'semantic-ui-react';
import Snowflake from '../SnowFlake.gif';

//jwt
// const email = document.getElementById("login-email").value;
// const password = document.getElementById("login-password").value;

// if (!email || !password) {
//   alert("Fill in the form!");
//   return;
// }

// const body = { email, password };

// const userToken = await axios.post("/user/signup", body);
// console.log(userToken);

// localStorage.setItem("token", userToken.data.token);

const LoginForm = (props) => {
  const { step, setStep, login, setLogin } = props;

  //initialize useState for login input 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (event) => {
    //change this to 3 later on for favourite page
    setStep(3);

    if ((email, password)){
      console.log('email: ', email, 'password: ', [password])

      const loginObj = {
        email,
        password,
      }
      console.log('This is login object: ', loginObj);
      setLogin(loginObj);
      //input fields are reset
      setEmail('');
      setPassword('');
      event.preventDefault()
    } else {
      alert('Email/Password entered incorrectly');
    } 
  };

  //get login input values
  const emailInput = (event) => {
    setEmail(event.target.value);
  }

  const passwordInput = (event) => {
    setPassword(event.target.value);
  }


  const handleSignUpSubmit = () => {
    setStep(2);
  };

  return (
    <>
      <div className="main-login-container">
        {/* login form */}
        <Grid stackable>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={2} widescreen={1}>
                <div className="to-signup-div">
                  <img
                    className="weather-logo"
                    src={Snowflake}
                    alt="weather-gif"
                  />
                </div>
                <div className="front-page-button">
                  <Button
                    color="teal"
                    type="submit"
                    onClick={handleSignUpSubmit}
                  >
                    Sign Up
                  </Button>
                </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={2} widescreen={1}>
                <div className="login-form-div">
                  <Form>
                    <Form.Field>
                      <label>Email</label>
                      <input placeholder="Email" onChange={emailInput}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input placeholder="Password" onChange={passwordInput}/>
                    </Form.Field>
                    <div className="front-page-button">
                      <Button
                        color="teal"
                        type="submit"
                        onClick={handleLoginSubmit}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
            </Grid.Column>
        </Grid>
      </div>
    </>
  );
};

export default LoginForm;
