import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Grid, Segment, Divider } from "semantic-ui-react";


const LoginForm = (props) => {
    const { setStep } = props;
    
    const handleLoginSubmit = () => {
        setStep(3);
    }

    const handleSignUpSubmit = () => {
        setStep(2);
      };

  return(
    <>
    {/* <img src={weather} alt="weather-gif" /> */}
      {/* Button to switch to register page */}
      <div className="to-login">
      
    {/* login form */}
    <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
  <Form>
    <Form.Field>
      <label>Email</label>
      <input placeholder="First Name" />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder="Last Name" />
    </Form.Field>
    <div className="front-page-button">
    <Button color='teal' type="submit" onClick={handleLoginSubmit}>Submit</Button>
    </div>
  </Form>
  
  </Grid.Column>
  <Grid.Column verticalAlign='middle'>
  <h2>Click here to register</h2>
    <div className="front-page-button">
    <Button color="teal" type="submit" onClick={handleSignUpSubmit}>Click Here</Button>
    </div>
    </Grid.Column>
    </Grid>

<Divider vertical>Or</Divider>
</Segment>
  </div>
  </>
  );
};

export default LoginForm;
