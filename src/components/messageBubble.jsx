import React from 'react';
import { Label } from 'semantic-ui-react';

// sign up form component
function MessageBubble(props) {
  const { username, message } = props;

  return (
    <div className={'ui small message message-bubble'} >
      <Label content={username} />
      <div>
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;
