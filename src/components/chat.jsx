import React, { useEffect, useState } from 'react';

import MessageBubble from './messageBubble.jsx';
import MessageInput from './messageInput.jsx';

// chat component
function Chat(props) {
  const { city, username } = props;

  // state to store messages that are sent / received
  const [chatMessages, setChatMessages] = useState([]);

  // to join the socket room
  useEffect(() => {
    socket.emit('join', { city, username });
  }, [city]);

  // when someone joins or leaves
  socket.on('connection message', (message) => {
    setChatMessages([...chatMessages, message]);
  });

  socket.on('from backend message', (message) => {
    setChatMessages([...chatMessages, message]);
  });

  return (
    <div>
      <div className='chat-box'>
        {chatMessages.map((message, index) => (
          <MessageBubble
          key={index}
          username={message.username}
          message={message.content} />
        ))}
      </div>
      <MessageInput
        username={username}
        city={city} />
    </div>
  );
}

export default Chat;
