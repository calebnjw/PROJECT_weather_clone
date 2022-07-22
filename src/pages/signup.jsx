import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import swal from 'sweetalert';

// sign up form component
const SignUpForm = (props) => {
  // import props from App component
  const { setStep } = props;

  // signup information
  const [signUp, setSignUp] = useState('');

  // initialise useState for signup input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // get input values
  const firstNameInput = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameInput = (event) => {
    setLastName(event.target.value);
  };
  const usernameInput = (event) => {
    setUsername(event.target.value);
  };
  const emailInput = (event) => {
    setEmail(event.target.value);
  };
  const passwordInput = (event) => {
    setPassword(event.target.value);
  };

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleInputSubmit = async (event) => {
    setStep(1);
    // condition: text box have value
    if ((firstName, lastName, username, email, password)) {
      // store items value in an Obj
      const signUpObj = {
        firstName,
        lastName,
        username,
        email,
        password,
      };

      // post user data to backend
      const userToken = await axios.post('/user/signup', signUpObj);
      console.log('userToken', userToken);
      // set token
      localStorage.setItem('token', userToken.data.token);

      setSignUp(signUpObj);
      // input fields are reset
      clearInputs();
      event.preventDefault();

      swal('Account created!', 'Login NOW!', 'success');

      if (!userToken.data.token) {
        swal('Email already in use!', 'Try another email or login NOW!');
        return true;
      }
    } else {
      swal('Inputs not filled');
      setStep(2);
      return false;
    }
  };

  return (
    <>
      <div className="to-sign-up">
        {/* signup form */}
        <div className="sign-up-form">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-first-name"
                label="First name"
                placeholder="First name"
                type="text"
                onChange={firstNameInput}
              />
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-last-name"
                label="Last name"
                placeholder="Last name"
                type="text"
                onChange={lastNameInput}
              />
            </Form.Group>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                type="text"
                onChange={usernameInput}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder="Email" type="email" onChange={emailInput} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                onChange={passwordInput}
              />
            </Form.Field>

            {/* ui big submit */}
            <div style={{ display: 'flex' }} >
              <div
                className="ui big button"
                onClick={() => {
                  setStep(1);
                  clearInputs();
                }}
                style={{ display: 'table', margin: 'auto' }}
              >
                Back
              </div>
              <div
                className="ui teal big button"
                onClick={handleInputSubmit}
                style={{ display: 'table', margin: 'auto' }}
              >
                <i className="sign-in icon"></i>
                Submit
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
