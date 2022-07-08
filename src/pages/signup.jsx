import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Step } from "semantic-ui-react";

const SignUpForm = (props) => {
  const { setStep } = props;

  const handleSubmit = () => {
    setStep(1);
  };

  return (
    <> 
    {/* Button to switch to login page */}
    <Button inverted color="teal" type="submit" onClick={handleSubmit}>Click Here</Button>
    {/* signup form */}
    <Form inverted>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-first-name"
          label="First name"
          placeholder="First name"
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-last-name"
          label="Last name"
          placeholder="Last name"
        />
      </Form.Group>
      <Form.Field>
        <label>Username</label>
        <input placeholder="Username" />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input placeholder="Email" />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder="Password" />
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button inverted color='teal' type="submit">Submit</Button>
    </Form>
  </>
  );

};

export default SignUpForm;
