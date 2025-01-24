import React from 'react';

const ChatMessage = ({ text, type, timestamp }: { text: string; type: string; timestamp: string }) => {
  return (
    <div className={`flex ${type === 'sent' ? 'justify-end' : ''}`}>
      <div
        className={`p-2 rounded-lg ${
          type === 'received' ? 'bg-blue-200' : 'bg-green-200'
        } mb-4`}
      >
        <p>{text}</p>
        <small className="block text-right text-xs text-gray-500">{timestamp}</small>
      </div>
    </div>
  );
};

export default ChatMessage;
