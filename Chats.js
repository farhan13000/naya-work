import React from 'react';
import { auth } from './firebase';

const Chat = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  return (
    <div>
      <h2>Demo Chat</h2>
      {/* Your chat interface */}
      <div className="chat-container">Chat Interface Goes Here</div>
      <div className="controls">
        <input type="text" placeholder="Type your message" />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Chat;
