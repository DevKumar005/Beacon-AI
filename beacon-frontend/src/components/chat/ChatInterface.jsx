import React from 'react';
import { ChatBubble } from './ChatBubble';
import { EligibilityCard } from './EligibilityCard';

export const ChatInput = ({ value, onChange, onSend }) => (
  <div className="flex items-end gap-2 max-w-2xl mx-auto w-full">
    <input
      className="flex-1 bg-zinc-900 border border-zinc-700 text-zinc-100 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-zinc-500"
      placeholder="Type your answer..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && onSend()}
    />
    <button 
      onClick={onSend} 
      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors font-medium"
    >
      Send
    </button>
  </div>
);

export const ChatInterface = ({ messages }) => {
  return (
    <div className="flex flex-col h-full bg-[#030303] p-4">
      <div className="flex-1 space-y-6">
        {messages.map((msg) => (
           msg.type === 'card' 
            ? <EligibilityCard key={msg.id} data={msg.data} />
            : <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
};