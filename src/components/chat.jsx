import React, { useEffect, useState } from 'react';

import MessageBubble from './messageBubble.jsx';
import MessageInput from './messageInput.jsx';

// chat component
function Chat(props) {
  const { city } = props;

  const [chatMessages, setChatMessages] = useState([]);
  const [output, setOutput] = useState([]);

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
      <MessageInput />
    </div>
  );
}

export default Chat;
