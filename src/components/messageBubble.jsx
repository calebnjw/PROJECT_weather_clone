import React from 'react';

// sign up form component
function MessageBubble(props) {
  const { message, classes } = props;

  return (
    <p className={`message-bubble ${classes}`} >
      { message }
    </p>
  );
}

export default MessageBubble;
