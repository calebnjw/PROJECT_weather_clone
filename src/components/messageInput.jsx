import React, { useState, useEffect } from 'react';

import {
  Button, Input, Form, GridColumn,
} from 'semantic-ui-react';

// sign up form component
function MessageInput(props) {
  const [message, setMessage] = useState('');

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    // this will be axios.post('/message/new', message)
    console.log(message);
    setMessage('');
  };

  return (
    <GridColumn>
      <Form>
        <Input
          type= 'text'
          placeholder='Type your message here'
          value={message}
          onChange={handleInput}
          action >
          <input></input>
          <Button type='submit' icon onClick={sendMessage}>
            <i className="fa-solid fa-paper-plane"></i>
          </Button>
        </Input>
      </Form>
    </GridColumn>
  );
}

export default MessageInput;
