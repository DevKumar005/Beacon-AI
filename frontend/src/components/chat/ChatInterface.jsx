import React from 'react';
import { ChatBubble } from './ChatBubble';
import { EligibilityCard } from './EligibilityCard';

export const ChatInput = ({ value, onChange, onSend, disabled }) => (
  <div className="flex items-end gap-2 max-w-2xl mx-auto w-full">
    <input
      className={`flex-1 bg-zinc-900 border border-zinc-700 text-zinc-100 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-zinc-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      placeholder={disabled ? "AI is thinking..." : "Type your answer..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      onKeyPress={(e) => e.key === 'Enter' && !disabled && onSend()}
    />
    <button 
      onClick={onSend} 
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-medium transition-colors ${
        disabled 
          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
          : "bg-blue-600 text-white hover:bg-blue-500"
      }`}
    >
      {disabled ? "Sending..." : "Send"}
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