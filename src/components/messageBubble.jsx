import React from 'react';
import { Label } from 'semantic-ui-react';

// sign up form component
function MessageBubble(props) {
  const { username, message } = props;

  return (
    <div className={'message-bubble'} >
      <Label content={username} />
      <div className="ui small teal message">
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;
