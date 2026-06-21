export const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-[80%] p-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-100 rounded-tl-none'}`}>
        {message.text}
      </div>
    </div>
  );
};