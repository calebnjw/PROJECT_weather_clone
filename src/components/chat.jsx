import React, { useEffect, useState } from 'react';

import MessageBubble from './messageBubble.jsx';
import MessageInput from './messageInput.jsx';

// chat component
function Chat() {
  const [chatMessages, setChatMessages] = useState([]);
  const [output, setOutput] = useState([]);

  socket.on('connection message', (message) => {
    console.log('connection message', message.message);
    const connectionMessage = <div>— {message.message} —</div>;
    setChatMessages([...chatMessages, connectionMessage]);
  });

  socket.on('chat message', (message) => {
    console.log(message);
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
