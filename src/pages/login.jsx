import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const LoginForm = (props) => {
    const { setStep } = props;

    const handleSubmit = () => {
        setStep(2);
      };

  return(
    <>
      {/* Button to switch to register page */}
      <div className="to-register">
        <h2>Click here to register</h2>
      <Button inverted color="teal" type="submit" onClick={handleSubmit}>Click Here</Button>
      </div>
    {/* login form */}
  <Form inverted>
    <Form.Field>
      <label>Email</label>
      <input placeholder="First Name" />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder="Last Name" />
    </Form.Field>
    <Button inverted color='teal' type="submit">Submit</Button>
  </Form>
  </>
  );
};

export default LoginForm;
