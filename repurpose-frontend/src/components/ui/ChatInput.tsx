import React from 'react';
import { MdSend } from 'react-icons/md';

const ChatInput = ({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}) => {
  return (
    <div className="p-4 flex items-center bg-gray-100">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none"
      />
      <button
        onClick={onSend}
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
      >
        <MdSend />
      </button>
    </div>
  );
};

export default ChatInput;
