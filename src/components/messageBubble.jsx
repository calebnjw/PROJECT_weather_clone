import React from 'react';

// sign up form component
function MessageBubble(props) {
  const { message, className } = props;

  return (
    <p className={className} >
      { message }
    </p>
  );
}

export default MessageBubble;
