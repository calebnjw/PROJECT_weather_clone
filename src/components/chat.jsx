import React from 'react';

import MessageBubble from './messageBubble.jsx';
import MessageInput from './messageInput.jsx';

// sign up form component
function Chat() {
  const messages = [
    'hello!',
    'the weather looks really good!',
    'I know! I love it.',
    'I\'m just checking out the weather here.',
    'Is it too hot?',
    'no it\'s quite cool here.',
  ];

  const messageList = messages.map((message, index) => (
    <MessageBubble key={index} message={message} className='message' />
  ));

  console.log(messageList);

  return (
    <div>
      <div className='chat-box'>
        { messageList }
        <MessageBubble className='message-self' key='10' message="I'm sending this out into the world." />
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;
