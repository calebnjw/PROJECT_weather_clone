import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Step } from "semantic-ui-react";

const SignUpForm = (props) => {
  const { setStep } = props;
//   const {signUp, setSignUp } = props; 

  const handleSubmit = () => {
    setStep(1);
  };

//     // initialise useState for item, price, person input
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//   const handleSignUpSubmit = (event) => {
//     console.log("Running handleSignUpSubmit")
//     // condition: text box have value
//     if (firstName && lastName && username && email && password) {
//         console.log(`FN: ${firstName}, LN: ${lastName}, username: ${username}, email: ${email}, pw: ${password}`)
//       // store items value in an Obj
//       const signUpObj = { firstName, lastName, username, email, password }
//       console.log(`signUpObj: ${signUpObj}`)
//       // store all the input in an array
//     setSignUp(event.target.value);
//   };

//   const handleSignUpInput = (event) => {
//     console.log("running handleSignUpInput")
//     setFirstName(event.target.value);
//     console.log(firstName)
//     setLastName(event.target.value);
//     console.log(lastName);
//     setUsername(event.target.value);
//     console.log(username);
//     setEmail(event.target.value);
//     console.log(email)
//     setPassword(event.target.value);
//     console.log(password)
//   };

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
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-last-name"
          label="Last name"
          placeholder="Last name"
          type="text"
        />
      </Form.Group>
      <Form.Field>
        <label>Username</label>
        <input placeholder="Username" type="text"/>
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input placeholder="Email" type="email"/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder="Password" type="password"/>
      </Form.Field>
      <div className="front-page-button">
      <Button color="teal" type="submit" onClick={handleSubmit}>Submit</Button>    
      </div>
      </Form>
      </div>
      </div>
  </>
  );

};

export default SignUpForm;
