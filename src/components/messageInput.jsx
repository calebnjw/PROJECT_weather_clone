import React, { useState, useEffect } from 'react';
import {
  Button, Input, Form, GridColumn,
} from 'semantic-ui-react';

// input + send component
function MessageInput(props) {
  const { username } = props;

  const [messageContent, setMessageContent] = useState('');

  const handleInput = (event) => {
    setMessageContent(event.target.value);
  };

  const sendMessage = () => {
    // ! username to be replaced with username from JWT
    // to send out chat message from input box
    socket.emit('chat message', { username, content: messageContent });
    setMessageContent('');
  };

  return (
    <Form>
      <Input
        fluid
        type= 'text'
        placeholder='Type your message here'
        value={messageContent}
        onChange={handleInput}
        action >
        <input></input>
        <Button type='submit' icon onClick={sendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </Button>
      </Input>
    </Form>
  );
}

export default MessageInput;
