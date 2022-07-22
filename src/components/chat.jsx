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

  // to receive connection message
  // when someone joins or leaves
  socket.on('connection message', (message) => {
    const newMessage = <div>— {message.content} —</div>;
    setChatMessages([...chatMessages, newMessage]);
  });

  // to receive messages
  socket.on('from backend message', (message) => {
    const newMessage = <MessageBubble
      key={message.content}
      username={message.username}
      message={message.content} />;
    setChatMessages([...chatMessages, newMessage]);
  });

  return (
    <div>
      <div className='chat-box'>
        { chatMessages }
      </div>
      <MessageInput
        username={username}
        city={city} />
    </div>
  );
}

export default Chat;
