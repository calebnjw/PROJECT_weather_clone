import React, { useState, useEffect } from 'react';
import {
  Button, Form, Segment, Grid, GridColumn,
} from 'semantic-ui-react';
import Snowflake from '../SnowFlake.gif';

const LoginForm = (props) => {
  const { setStep } = props;

  const handleLoginSubmit = () => {
    setStep(3);
  };

  const handleSignUpSubmit = () => {
    setStep(2);
  };

  return (
    <>
      <div className="main-login-container">
        {/* login form */}
        <Grid stackable columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Segment>
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
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <div className="login-form-div">
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
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default LoginForm;
