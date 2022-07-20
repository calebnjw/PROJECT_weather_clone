import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

import MessageBubble from './messageBubble.jsx';
import MessageInput from './messageInput.jsx';

// chat component
function Chat(props) {
  const { city, userToken } = props;

  const [chatMessages, setChatMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [output, setOutput] = useState([]);

  useEffect(() => {
    if (Object.keys(userToken).length > 0) {
      setUsername(jwt(userToken).username);
      console.log(username);
    }
  }, [userToken]);

  // to receive connection message
  // when someone joins or leaves
  socket.on(`connection message ${city}`, (message) => {
    const connectionMessage = <div>— {message.message} —</div>;
    setChatMessages([...chatMessages, connectionMessage]);
  });

  // to receive message from input box
  socket.on(`chat message ${city}`, (message) => {
    const newMessage = <MessageBubble username={message.username} message={message.content} />;
    setChatMessages([...chatMessages, newMessage]);
  });

  return (
    <div>
      <div className='chat-box'>
        { chatMessages }
      </div>
      <MessageInput username={username} />
    </div>
  );
}

export default Chat;
