import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

import MessageBubble from './messageBubble.jsx';
import MessageInput from './messageInput.jsx';

// chat component
function Chat(props) {
  const { city, username } = props;

  const [chatMessages, setChatMessages] = useState([]);
  // const [username, setUsername] = useState('');
  // const [output, setOutput] = useState([]);

  // // to set user token and username
  // useEffect(() => {
  //   if (userToken === null) {
  //     setUsername('');
  //   } else {
  //     setUsername(jwt(userToken).username);
  //   }
  // }, [userToken]);

  // to join the socket room
  useEffect(() => {
    socket.emit('join', city);
  }, []);

  // to receive connection message
  // when someone joins or leaves
  socket.on('connection message', (message) => {
    const newMessage = <div>— {message.content} —</div>;
    setChatMessages([...chatMessages, newMessage]);
  });

  // to receive messages
  socket.on('from backend message', (message) => {
    const newMessage = <MessageBubble username={message.username} message={message.content} />;
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
