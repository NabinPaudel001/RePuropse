import React from 'react';
import ChatMessage from './ChatMessage';

const ChatBox = ({ messages }: { messages: any[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map(({ id, text, type, timestamp }: any) => (
        <ChatMessage key={id} text={text} type={type} timestamp={timestamp} />
      ))}
    </div>
  );
};

export default ChatBox;
