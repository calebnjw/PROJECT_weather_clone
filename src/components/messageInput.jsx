import React, { useState, useEffect } from 'react';
import {
  Button, Input, Form, GridColumn,
} from 'semantic-ui-react';

// input + send component
function MessageInput(props) {
  const [messageContent, setMessageContent] = useState('');

  const handleInput = (event) => {
    setMessageContent(event.target.value);
  };

  const sendMessage = () => {
    console.log(messageContent);
    // username to be replaced with username from JWT
    socket.emit('chat message', { username: 'calebnjw', content: messageContent });
    setMessageContent('');
  };

  return (
    <Form>
      <Input
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
